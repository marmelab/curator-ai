/** @type {import('tailwindcss').Config} */

/* npx tailwindcss -i input.css -o output.css --watch */

module.exports = {
  content: ["./**/*.{html,js,css}"],
  theme: {
    extend: {
      colors : {
        'grey' : '#E6E6E6',
        'light_blue' : '#3C67AD',
        'mid_blue' : '#2F509F',
        'black' : '#1A1A1A'
      }
    },
    fontFamily: {
      magnolia: ['Magnolia', 'sans-serif'],
    },
  },
  plugins: [],
}

