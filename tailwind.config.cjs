const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svelte}"],
  theme: {
    screens: {
      'xs': "475px",
      ...defaultTheme.screens
    },
    colors: {
      navy: "#0B0BFF",
      aqua: "#7FFFD4",
      rose: "#E11D48",
      cloud: "#232933",
      cloudBirst: "#374151",
      darkGrey: "#СССССС",
      lightGrey: "#D3D3D3"
    },
      extend: {
        fontFamily: {
          'ubuntuBold': ['ubuntuBold', 'UbuntuBold'],
          'ubuntuRegular': ['ubuntuRegular', 'UbuntuRegular']
        },
      },
  },
  plugins: [require("daisyui")],
};
