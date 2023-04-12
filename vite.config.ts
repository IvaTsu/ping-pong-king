import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // override path's fill color so that it can be changed via 'color' prop
        replaceAttrValues: {
          "#539165": "currentColor",
          "#E11D48": "currentColor",
        },
      },
    }),
  ],
});
