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
          navy: '#0B1B33',
          amber: '#F2A33A',
          'amber-hover': '#e09228',
          'amber-pale': '#FDEBD0',
          page: '#F4F6FA',
          muted: '#4F5F78',
          success: '#17824F',
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
        'soft': '0 4px 20px -2px rgba(11, 27, 51, 0.05)',
        'card': '0 2px 12px -1px rgba(11, 27, 51, 0.06), 0 1px 3px rgba(11, 27, 51, 0.04)',
        'elevated': '0 10px 30px -5px rgba(11, 27, 51, 0.09)',
      }
    },
  },
  plugins: [],
}
