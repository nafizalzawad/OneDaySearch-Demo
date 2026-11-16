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
          green: '#0B5844', // Deep Emerald workhorse (#0B5844 from client palette)
          'green-hover': '#00381F',
          'green-bright': '#187E5F', // Rich Signature Emerald (#187E5F from client palette)
          'green-pale': '#E6F7F2', // Pale mint/seafoam tint
          emerald: '#187E5F',
          'emerald-deep': '#0B5844',
          'emerald-dark': '#00381F',
          'emerald-shimmer': '#2DD4A0',
          'emerald-pale': '#E6F7F2',
          teal: '#187E5F',
          'teal-bright': '#187E5F',
          'teal-deep': '#0B5844',
          'teal-sunlit': '#2DD4A0',
          'teal-pale': '#E6F7F2',
          orange: '#F97316', // Sunset Orange CTA pop
          'orange-hover': '#EA580C',
          page: '#187E5F',
          muted: '#5A6B7F',
          success: '#0B5844',
          border: '#D1E5DE',
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
        'glow': '0 0 25px -5px rgba(107, 174, 185, 0.35)',
      }
    },
  },
  plugins: [],
}
