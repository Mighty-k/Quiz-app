// tailwind.config.js
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
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('tailwind-scrollbar-hide'),
    ],
  }