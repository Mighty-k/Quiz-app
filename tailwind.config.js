// tailwind.config.js
const uiDevConfig = require('@mighty_s/ui-dev/tailwind.config')

module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#6366f1',
            dark: '#4f46e5',
          },
          dark: {
            DEFAULT: '#111827',
            800: '#1f2937',
            700: '#374151',
            600: '#4b5563',
          },
          ...uiDevConfig().theme.extend.colors
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
          display: ["DM Sans", "system-ui", "sans-serif"],
          body: ["DM Sans", "system-ui", "sans-serif"],
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          ...uiDevConfig().theme.extend.animation
        },
        boxShadow: {
          "arch-soft": "0 2px 8px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.04)",
          "arch-medium": "0 4px 16px rgba(15, 23, 42, 0.08), 0 16px 40px rgba(15, 23, 42, 0.06)",
          "arch-hard": "0 1px 0 rgba(15, 23, 42, 0.1), 0 4px 12px rgba(15, 23, 42, 0.05)",
          "arch-glow": "0 0 0 1px rgba(249, 115, 22, 0.15), 0 4px 16px rgba(249, 115, 22, 0.1)",
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('tailwind-scrollbar-hide'),
    ],
  }