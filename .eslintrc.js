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
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "import/order": 0,
    "import/no-unresolved": 0,
    "import/no-duplicates": 1,
    "sort-imports": 0,
    "simple-import-sort/imports": 1,
    "simple-import-sort/exports": 1,
    "@typescript-eslint/no-explicit-any": 0,
  },
  overrides: [{
    files: [
      "examples/**/*.ts",
      "packages/*/examples/**/*.ts",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": 0,
      "@typescript-eslint/no-empty-function": 0,
    },
  }],
  ignorePatterns: ["packages/*/lib/"],
};
