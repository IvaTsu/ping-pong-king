/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svelte}"],
  theme: {
    colors: {
      navy: "#0C0C91",
      aqua: "#7FFFD4",
      rose: "#E11D48",
      cloud_birst: "#374151"
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
