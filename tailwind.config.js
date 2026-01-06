/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  safelist: [
    'owl-stage-outer',
    'owl-stage',
    'owl-item',
    'owl-dots',
    'owl-dot',
    'active',
  ],
  theme: {
    extend: {
      fontFamily: {
        base: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

