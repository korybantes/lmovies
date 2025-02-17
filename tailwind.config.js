/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      // Z-Index Extensions
      zIndex: {
        '90': '90',
        '100': '100',
      },
      // Keyframes for Advanced Animations
      keyframes: {
        'text-shine': {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '100% 50%' }
        },
        'gradient-wave': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' }
        },
        'glass-effect': {
          '0%': { 'backdrop-filter': 'blur(0px)', backgroundColor: 'rgba(255,255,255,0)' },
          '100%': { 'backdrop-filter': 'blur(12px)', backgroundColor: 'rgba(255,255,255,0.1)' }
        },
        'laser-beam': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'particle': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'translateY(-100vh) scale(0.5)', opacity: 0 }
        }
      },
      // Custom Animations
      animation: {
        'text-shine': 'text-shine 3s ease infinite',
        'gradient-wave': 'gradient-wave 8s ease infinite',
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-pulse': 'scale-pulse 3s ease infinite',
        'glass-effect': 'glass-effect 0.4s ease forwards',
        'laser-beam': 'laser-beam 2s linear infinite',
        'particle': 'particle 6s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      // Updated Color Palette
      colors: {
        'primary': {
          DEFAULT: '#F59E0B',
          50: '#FEF3C7',
          100: '#FDE68A',
          200: '#FCD34D',
          300: '#FBBF24',
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
          800: '#78350F',
          900: '#451A03',
        },
        'surface': {
          DEFAULT: '#0F0F0F',
          100: '#262626',
          200: '#1F1F1F',
          300: '#171717',
          400: '#141414',
          500: '#0F0F0F',
        },
        'accent': '#10B981',
      },
      // Advanced Gradients
      backgroundImage: {
        'metal-gradient': `linear-gradient(
          135deg,
          hsl(0, 0%, 12%) 0%,
          hsl(0, 0%, 15%) 50%,
          hsl(0, 0%, 12%) 100%
        )`,
        'neon-gradient': `linear-gradient(
          45deg,
          #F59E0B 0%,
          #FCD34D 50%,
          #F59E0B 100%
        )`,
      },
      // Modern Shadow System
      boxShadow: {
        'depth-1': '0 1px 2px 0 rgb(0 0 0 / 0.15)',
        'depth-2': '0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.15)',
        'glow': '0 0 15px rgba(245, 158, 11, 0.4)',
        'inner-glow': 'inset 0 0 12px rgba(255,255,255,0.1)'
      },
      // Backdrop Blur Effects
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      // Transition Extensions
      transitionProperty: {
        'filter': 'filter, backdrop-filter',
        'glass': 'background-color, backdrop-filter',
        'all': 'all'
      },
      // Modern Typography
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Bebas Neue', 'Impact', 'sans-serif']
      },
      // Aspect Ratios
      aspectRatio: {
        'poster': '2 / 3',
        'banner': '16 / 9'
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'), // For advanced animations
    require('@tailwindcss/typography'), // For rich text styling
    require('@tailwindcss/aspect-ratio'), // For aspect ratio utilities
    require('@tailwindcss/container-queries') // For container query support
  ],
};