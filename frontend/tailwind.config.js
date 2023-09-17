/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EDEDF8',
          100: '#DADAF1',
          200: '#B6B6E2',
          300: '#9191d4',
          400: '#6c6cc6',
          500: '#4848B7',
          600: '#393993',
          700: '#2B2B6E',
          800: '#1D1D49',
          900: '#0E0E25',
          950: '#070712',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
