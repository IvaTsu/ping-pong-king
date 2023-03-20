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
      darkGrey: "#cccccc"
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
