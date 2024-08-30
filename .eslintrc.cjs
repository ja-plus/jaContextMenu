/** typescript eslint config */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['html', 'prettier', '@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 1,
    'new-cap': 1,
    eqeqeq: 1,
    'dot-notation': 1,
    // 'no-debugger': 0,
    // 'no-console': 0,
    'no-new-object': 1, // not new Object()
    'object-shorthand': 1,
  },
};
