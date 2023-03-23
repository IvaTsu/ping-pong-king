/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svelte}"],
  theme: {
    colors: {
      navy: "#0B0BFF",
      aqua: "#7FFFD4",
      rose: "#E11D48",
      cloud: "#232933",
      cloudBirst: "#374151",
      darkGrey: "#cccccc",
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
