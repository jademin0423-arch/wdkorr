/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          pink: '#F8D7DA',
          ivory: '#FFFEF7',
          rose: '#FFE4E6',
        }
      }
    },
  },
  plugins: [],
}

