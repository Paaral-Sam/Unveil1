import React from 'react';
import {
  Shield,
  ArrowRight,
  Lock,
  User,
  MapPin,
  Phone,
  Car,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WelcomeView: React.FC = () => {
  const { goToLogin } = useApp();

  return (
    <div className="min-h-screen w-full bg-[#03050B] text-slate-100 font-sans flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-hidden select-none">
      {/* Top Header Navigation Strip */}
      <header className="w-full px-8 lg:px-16 py-6 flex items-center justify-between border-b border-blue-900/40 backdrop-blur-xl z-20 bg-[#050811]/90">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#EF4444] to-[#0066FF] border border-white/20 flex items-center justify-center text-white font-bold shadow-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-2xl text-white tracking-tight leading-none">UnVeil</span>
            <span className="text-xs text-[#EF4444] font-mono uppercase tracking-widest block font-semibold">Intelligence</span>
          </div>
        </div>

        {/* Top Action CTAs */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => goToLogin('user')}
            className="px-6 py-2.5 rounded-full bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/60 text-slate-200 hover:text-white font-bold text-sm btn-motion transition-all flex items-center space-x-1.5"
          >
            <User className="w-4 h-4 text-blue-400" />
            <span>Analyst Login</span>
          </button>
          <button
            onClick={() => goToLogin('admin')}
            className="px-6 py-2.5 rounded-full bg-[#DC2626] hover:bg-red-600 text-white font-bold text-sm shadow-lg btn-motion flex items-center space-x-2 transition-all shadow-red-950/50"
          >
            <Lock className="w-4 h-4" />
            <span>Admin Gateway</span>
          </button>
        </div>
      </header>

      {/* Main Split 2-Column Layout */}
      <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column: Crimson Red Theme Branding, Quote & Moved CTAs */}
        <div className="p-8 sm:p-12 lg:p-20 flex flex-col justify-center space-y-8 bg-red-glow border-r border-red-950/40 z-10">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-red-950/40 border border-red-500/40 text-xs sm:text-sm font-mono text-red-400 font-bold shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span>AI-POWERED CRIMINAL NETWORK ANALYSIS SYSTEM</span>
            </div>

            {/* Editorial Title */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.02] font-sans">
              UNVEIL
              <span className="block font-serif italic text-[#EF4444] font-bold pr-3">
                INTELLIGENCE
              </span>
            </h1>

            {/* Inspiring Editorial Quote */}
            <blockquote className="p-6 rounded-3xl bg-[#14050A] border-l-4 border-[#EF4444] text-lg sm:text-xl text-slate-200 font-medium leading-relaxed italic shadow-xl relative">
              <span className="text-3xl text-[#EF4444] font-serif absolute top-3 left-3">“</span>
              <p className="pl-4">"In the shadows of fragmented evidence, UnVeil illuminates the hidden threads of criminal networks."</p>
            </blockquote>

            {/* Description Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              An AI-powered system that automatically analyzes structured and unstructured crime-related data to uncover criminal networks, identify key influencers, detect suspicious patterns, and provide actionable tactical intelligence for law enforcement investigators.
            </p>

            {/* Access CTAs Moved Up Directly Below Description */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up">
              <button
                onClick={() => goToLogin('user')}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#EF4444] to-[#0066FF] hover:from-[#DC2626] hover:to-[#0055DD] text-white font-bold text-base shadow-2xl btn-motion flex items-center justify-center space-x-3"
              >
                <span>Access Analyst Workspace</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => goToLogin('admin')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1A050D] hover:bg-[#280815] border border-red-500/40 text-slate-200 hover:text-white font-bold text-base btn-motion flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4 text-[#EF4444]" />
                <span>Admin Portal (unveil2026)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Tactical Blue Network Graph (Cards Removed) */}
        <div className="relative min-h-[600px] lg:min-h-full bg-blue-glow flex items-center justify-center p-8 sm:p-12 overflow-hidden select-none">
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(0,102,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Ambient Glowing Spotlights */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Central Interactive Network Topology Graphic Container */}
          <div className="relative z-10 w-full h-full min-h-[500px] flex items-center justify-center">
            {/* SVG Connecting Lines between Central Node & Satellites */}
            <svg className="absolute inset-0 w-full h-full stroke-blue-400/30 stroke-1 pointer-events-none">
              {/* Concentric Orbit Rings */}
              <circle cx="50%" cy="50%" r="140" fill="none" stroke="rgba(0, 102, 255, 0.2)" strokeDasharray="6 6" />
              <circle cx="50%" cy="50%" r="220" fill="none" stroke="rgba(0, 102, 255, 0.12)" strokeDasharray="4 4" />

              {/* Connecting Radiating Vector Lines */}
              <line x1="50%" y1="50%" x2="30%" y2="28%" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="1.5" />
              <line x1="50%" y1="50%" x2="70%" y2="22%" stroke="rgba(0, 102, 255, 0.6)" strokeWidth="1.5" />
              <line x1="50%" y1="50%" x2="22%" y2="58%" stroke="rgba(0, 102, 255, 0.5)" strokeWidth="1.5" />
              <line x1="50%" y1="50%" x2="34%" y2="78%" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="1.5" />
              <line x1="50%" y1="50%" x2="68%" y2="76%" stroke="rgba(0, 102, 255, 0.6)" strokeWidth="1.5" />
              <line x1="50%" y1="50%" x2="78%" y2="50%" stroke="rgba(0, 102, 255, 0.6)" strokeWidth="1.5" />
            </svg>

            {/* Central Key Node Avatar with Hot Red Inner Ring & Neon Blue Outer Halo */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#041029] border-2 border-[#EF4444] p-1 shadow-[0_0_50px_#0088FF] z-20 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#041029] flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Satellite Entity Nodes around center node */}
            <div className="absolute top-[28%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#18040B] border border-[#EF4444] flex items-center justify-center text-[#EF4444] shadow-lg backdrop-blur-md">
              <Phone className="w-6 h-6" />
            </div>

            <div className="absolute top-[22%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#041029] border border-[#0066FF] flex items-center justify-center text-[#0088FF] shadow-lg backdrop-blur-md">
              <MapPin className="w-6 h-6" />
            </div>

            <div className="absolute top-[58%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#18040B] border border-[#EF4444] flex items-center justify-center text-[#EF4444] shadow-lg backdrop-blur-md">
              <MapPin className="w-6 h-6" />
            </div>

            <div className="absolute top-[78%] left-[34%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#18040B] border border-[#EF4444] flex items-center justify-center text-[#EF4444] shadow-lg backdrop-blur-md">
              <User className="w-6 h-6" />
            </div>

            <div className="absolute top-[76%] left-[68%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#041029] border border-[#0066FF] flex items-center justify-center text-[#0088FF] shadow-lg backdrop-blur-md">
              <Car className="w-6 h-6" />
            </div>

            <div className="absolute top-[50%] left-[78%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#041029] border border-[#0066FF] flex items-center justify-center text-[#0088FF] shadow-lg backdrop-blur-md">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#03050B] border-t border-blue-900/40 py-6 px-8 text-center text-xs text-slate-400 font-mono z-20">
        UnVeil Criminal Network Intelligence &copy; 2026. Official Law Enforcement Tactical Application.
      </footer>
    </div>
  );
};
