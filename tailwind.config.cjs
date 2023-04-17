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
      navy: "#646cff",
      rose: "#E11D48",
      white: "#ffffff",
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
