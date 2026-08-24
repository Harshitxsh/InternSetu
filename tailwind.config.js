/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0f1f38',
          deep: '#0a1424',
          dark: '#142749',
          blue: '#1d4ed8',
          lightBlue: '#3b82f6',
          sky: '#0284c7',
          saffron: '#ea580c',
          gold: '#f59e0b',
          amber: '#d97706',
          emerald: '#059669',
          mint: '#10b981',
          slate: '#334155',
          light: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gov': '0 4px 20px -2px rgba(15, 31, 56, 0.08), 0 2px 6px -2px rgba(15, 31, 56, 0.04)',
        'gov-lg': '0 10px 30px -4px rgba(15, 31, 56, 0.12), 0 4px 12px -2px rgba(15, 31, 56, 0.06)',
        'gov-glow': '0 0 25px -3px rgba(37, 99, 235, 0.25)',
        'gold-glow': '0 0 25px -3px rgba(245, 158, 11, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
