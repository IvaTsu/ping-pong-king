module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "../../.eslintrc.js",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["tailwindcss"],
  rules: {
    "tailwindcss/classnames-order": "error",
    "tailwindcss/no-custom-classname": "off",
  },
  ignorePatterns: ["vite.config.ts"],
};
