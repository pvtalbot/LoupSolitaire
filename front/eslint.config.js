import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import ts from "typescript-eslint";

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "vite.config.ts"],
  },
);
