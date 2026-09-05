/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        polar: {
          50: '#f0f7ff',
          100: '#e0eef9',
          200: '#b9dcf2',
          300: '#7fc1e6',
          400: '#4ea3d6',
          500: '#2a86bf',
          600: '#1e6ba0',
          700: '#1a557f',
          800: '#194668',
          900: '#0f2c45',
          950: '#081a2c',
        },
        ice: {
          50: '#f6fafc',
          100: '#eef4f8',
          200: '#dde9f0',
        },
        cyan: {
          accent: '#5eead4',
        },
      },
      backgroundImage: {
        'grid-faint': "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.08)',
        'glow': '0 0 0 1px rgba(94, 234, 212, 0.2), 0 8px 32px -8px rgba(94, 234, 212, 0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
