/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'se-color': '#674392',
      'se-color-light': '#8861B7',
      'se-dark': '#262626',
      'se-color-dark': '#2F293A',
      'se-gray': '#f2f2f208',
      'se-gray-light': '#D0CBD6',
      'se-white': '#F1EBF8',
      'se-black1800': '#f2f2f208'
    },
  },
  plugins: [
      require('@tailwindcss/forms')
  ],
}

