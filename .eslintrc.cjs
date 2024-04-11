module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-shadow": 0,
    "no-eval": 0,
    camelcase: 0,
    "array-callback-return": 0,
    "no-extend-native": 0,
    "react-hooks/exhaustive-deps": 0,
    "react/jsx-uses-react": 0,
    "react/react-in-jsx-scope": 0,
    "import/no-anonymous-default-export": 0,
    "@typescript-eslint/naming-convention": 0,
    "@typescript-eslint/no-unused-vars": 0,
  },
};
