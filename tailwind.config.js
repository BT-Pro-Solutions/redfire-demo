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
        'primary': '#3b82f6',
        'primary-dark': '#2563eb',
      }
    },
  },
  plugins: [],
}



