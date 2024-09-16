import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";



export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser, parser: tsParser,parserOptions: {
    project: './tsconfig.json',  
  },}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {rules: {
    // "no-console": "warn", 
    "semi": ["error", "always"], 
    "@typescript-eslint/no-unused-vars": "error", 
    // "complexity": ["error", 3],
     "@typescript-eslint/no-unnecessary-condition": "error",
     "@typescript-eslint/no-floating-promises": "error",
     "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    // "@typescript-eslint/naming-convention": ["warn", 
    //   {
    //     selector: 'variable',
    //     format: ['camelCase'],
    //     leadingUnderscore: 'allow',
    //     trailingUnderscore: 'allow',
    //   },
    // ]
  },
}
];