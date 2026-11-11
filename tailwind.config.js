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
        brand: {
          charcoal: '#1C2733',
          green: '#1E535E', // Deep Architectural Teal workhorse
          'green-hover': '#163E47',
          'green-bright': '#4A8B99', // Architectural Blueish Green signature
          'green-pale': '#E2EFF1', // Pale Seafoam architectural tint
          teal: '#4A8B99',
          'teal-bright': '#4A8B99',
          'teal-deep': '#1E535E',
          'teal-sunlit': '#68AAB7',
          'teal-pale': '#E2EFF1',
          orange: '#F97316', // Sunset Orange CTA pop
          'orange-hover': '#EA580C',
          page: '#4A8B99',
          muted: '#5A6B7F',
          success: '#1E535E',
          border: '#D1E2E5',
        }
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(28, 39, 51, 0.05)',
        'card': '0 2px 12px -1px rgba(28, 39, 51, 0.06), 0 1px 3px rgba(28, 39, 51, 0.04)',
        'elevated': '0 10px 30px -5px rgba(28, 39, 51, 0.09)',
        'glow': '0 0 25px -5px rgba(74, 139, 153, 0.35)',
      }
    },
  },
  plugins: [],
}
