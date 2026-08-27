import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  color: string;
  baseAlpha: number;
  alpha: number;
  pulseOffset: number;
  pulseSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking position
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180
    };

    // Color palette matching UnVeil theme (Blue, Purple, Pink/Red, Cyan, Crimson)
    const colors = [
      'rgba(59, 130, 246, ',   // Vibrant Blue
      'rgba(168, 85, 247, ',  // Purple Glow
      'rgba(236, 72, 153, ',  // Neon Pink
      'rgba(232, 93, 117, ',  // Red Accent
      'rgba(14, 165, 233, '   // Cyan Energy
    ];

    // Generate 110 Dynamic High-Velocity Moving Particles
    const particleCount = Math.min(110, Math.floor((width * height) / 14000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2.5 + 1.2;
      const alpha = Math.random() * 0.5 + 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
        baseRadius: radius,
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: alpha,
        alpha,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.04
      });
    }

    // Shooting Stars Array
    const shootingStars: ShootingStar[] = [];

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.5),
        length: Math.random() * 80 + 40,
        speed: Math.random() * 6 + 4,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg
        alpha: 1,
        active: true
      });
    };

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Mouse Movement Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let frameCount = 0;

    // Animation Render Loop
    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // Periodically trigger shooting stars
      if (frameCount % 180 === 0 && Math.random() > 0.3) {
        createShootingStar();
      }

      // 1. Draw Constellation Lines Between Nearby Particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.3;
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 2. Update & Draw Floating Particles
      particles.forEach((p) => {
        // Continuous organic movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off canvas boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pulsing shimmer animation
        p.pulseOffset += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulseOffset) * 0.8;
        p.alpha = Math.min(1, Math.max(0.2, p.baseAlpha + Math.sin(p.pulseOffset) * 0.25));

        // Mouse Gravitational Interaction
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);

        if (distMouse < mouse.radius) {
          const mouseAlpha = (1 - distMouse / mouse.radius) * 0.65;
          ctx.strokeStyle = `rgba(236, 72, 153, ${mouseAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Draw Particle Circle with Outer Soft Glow Ring
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
        ctx.fill();

        // Outer Glow Circle for larger particles
        if (p.radius > 2) {
          ctx.fillStyle = `${p.color}${p.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Render Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.active) continue;

        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${star.alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(236, 72, 153, ${star.alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Move shooting star
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.alpha -= 0.015;

        if (star.alpha <= 0 || star.x > width || star.y > height) {
          star.active = false;
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden block w-full h-full"
    />
  );
};
