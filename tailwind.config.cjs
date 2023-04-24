/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svelte}"],
  theme: {
    colors: {
      aqua: "#7FFFD4",
      cloud: "#232933",
      cloudBirst: "#374151",
      darkGrey: "#CCCCCC",
      lightGrey: "#D3D3D3",
      middleGreen: "#539165",
      navy: "#646CFF",
      rose: "#E11D48",
      white: "#FFFFFF",
      black: "#000000",
      red: "#FF0000",
      orange: "#FFA500",
      yellow: "#E6DB63",
      green: "#00FF00",
    },
    extend: {
      fontFamily: {
        ubuntuBold: ["ubuntuBold", "UbuntuBold"],
        ubuntuRegular: ["ubuntuRegular", "UbuntuRegular"],
      },
    },
  },
  plugins: [require("daisyui")],
};
