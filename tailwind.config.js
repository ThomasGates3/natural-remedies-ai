/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
    "./services/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Inter', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      red: {
        400: '#f87171',
        500: '#ef4444',
      },
      slate: {
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
      },
      teal: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
        950: '#0d3f3a',
      },
      'energetic-green': '#34D399',
      'bright-accent': '#A7F3D0',
      'dark-green-bg': '#064E3B',
      'dark-green-content': '#043A2E',
      'text-light': '#F0FDF4',
      'text-dark': '#A7F3D0',
      'text-muted': '#6EE7B7',
      primary: {
        light: '#22c55e',
        DEFAULT: '#16a34a',
        dark: '#15803d'
      },
      secondary: '#f97316',
    },
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in',
        slideDown: 'slideDown 0.6s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        scaleIn: 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    }
  },
  darkMode: 'class',
  plugins: [],
}
