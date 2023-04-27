/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      "xxs": '320px',
      "xs": '375px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      "xl": '1280px',
      "xxl": '1920px'
    },
  },
  plugins: [],
}
