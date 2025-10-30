/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
    "./services/**/*.{ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
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
      }
    }
  },
  plugins: [],
}
