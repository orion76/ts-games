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
      ...angular.configs.templateAll,
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
      "@angular-eslint/template/no-call-expression": "off",
      "@angular-eslint/template/i18n": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/adjacent-overload-signatures": "off",
      "@angular-eslint/template/button-has-type": "off",
      "@angular-eslint/template/no-inline-styles": "off"

    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      ...angular.configs.templateAll,

      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/no-call-expression": "off",
      "@angular-eslint/template/i18n": "off",
      "@angular-eslint/template/button-has-type": "off",
      "@angular-eslint/template/no-inline-styles": "off"
    },
  }
);
