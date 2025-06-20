// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettierESLint = require("prettier-eslint");
// const esLintPluginPrettierRecommended = require("eslint-plugin-prettier").configs.recommended;

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,

    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/component-class-suffix": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/adjacent-overload-signatures": "off"

    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
