module.exports = {
  env: { browser: true, node: true },
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "import",
    "simple-import-sort",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "import/order": 0,
    "import/no-unresolved": 1,
    "import/no-duplicates": 1,
    "sort-imports": 0,
    "simple-import-sort/imports": 1,
    "simple-import-sort/exports": 1,
  },
};
