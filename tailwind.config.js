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
      primary: {
        light: '#22c55e',
        DEFAULT: '#16a34a',
        dark: '#15803d'
      },
      secondary: '#f97316',
    },
    extend: {}
  },
  darkMode: 'class',
  plugins: [],
}
