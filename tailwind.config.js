/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1d23',
        'dark-surface': '#23262d',
        'sidebar': '#1f2228',
        'surface': '#ffffff',
        'surface-secondary': '#f8f9fa',
        'border': '#e5e7eb',
        'primary': {
          DEFAULT: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark-rgb) / <alpha-value>)',
        },
      }
    },
  },
  plugins: [],
}



