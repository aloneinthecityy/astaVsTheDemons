/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,css}'],
  theme: {
    extend: {
      fontFamily: {
        amatic: ['Amatic SC'],
      },
      screens: {
        '2xl': '606.4px',
        '1xl': '500px',
        maxWidth: '100%',
        maxHeight: '100%',
      },
      backgroundImage: {
        mente: "url('./image.png)",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
