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
      sans: ['Lexend', 'system-ui', 'sans-serif']
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
      primary: {
        light: '#22c55e',
        DEFAULT: '#16a34a',
        dark: '#15803d'
      },
      secondary: '#f97316',
      background: {
        light: '#FFFBEF',
        dark: '#1a2e27'
      },
      card: {
        light: '#5C4033',
        dark: '#203a31'
      },
      text: {
        light: '#3D2B1F',
        dark: '#FFFFFF',
        onCard: {
          light: '#F5F5DC'
        }
      },
      subtle: {
        light: '#6B4F4B',
        dark: '#a7f3d0',
        onCard: {
          light: '#D2B48C'
        }
      }
    },
    extend: {}
  },
  darkMode: 'class',
  plugins: [],
}
