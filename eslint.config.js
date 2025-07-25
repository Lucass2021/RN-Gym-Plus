import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-native": reactNative,
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react-native/no-inline-styles": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
