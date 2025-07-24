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
    "plugin:react/recommended",
    "plugin:tailwindcss/recommended",
    "standard-with-typescript",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "tailwindcss", "simple-import-sort"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "tailwindcss/classnames-order": "error",
    "tailwindcss/no-custom-classname": "off",
  },
};
