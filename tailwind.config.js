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
          green: '#00BC82',
          'green-hover': '#009B6B',
          'green-bright': '#6AE878',
          'green-pale': '#DBFCC5',
          orange: '#F97316',
          'orange-hover': '#E86A0A',
          page: '#F4F6FA',
          muted: '#5A6B7F',
          success: '#00BC82',
          border: '#E3E8F0',
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
        'glow': '0 0 25px -5px rgba(106, 232, 120, 0.3)',
      }
    },
  },
  plugins: [],
}
