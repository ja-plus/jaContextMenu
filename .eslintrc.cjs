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
    // 'spaced-comment': 1, // 注释斜杠后空格
    'new-cap': 1, // 构造函数首字母大写
    eqeqeq: 1, // 使用 ===
    'dot-notation': 1, // 强制使用.不用[]
    // 'no-debugger': 0,
    // 'no-console': 0,
    'no-new-object': 1, // 使用字面量创建对象 非new Object()
    'object-shorthand': 1, // 对象方法属性值缩写
  },
}
