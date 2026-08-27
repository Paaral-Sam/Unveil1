/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        unveil: {
          bg: '#0C0A10',
          panel: '#15121C',
          card: '#1A1724',
          cardhover: '#221E2F',
          border: '#282336',
          borderbright: '#3D3652',
          purple: '#A855F7',
          magenta: '#EC4899',
          text: '#F8FAFC',
          muted: '#94A3B8',
          submuted: '#CBD5E1',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
