module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['html', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 1,
    quotes: [1, 'single'], // 使用单引号
    semi: [1, 'always'], // 使用分号结尾
    'no-unused-vars': 1,
    'no-debugger': 1,
    'space-infix-ops': 1, // 操作符周围空格
    'arrow-spacing': 1, // 箭头函数空格
    'keyword-spacing': 1, // 关键词空格
    'no-trailing-spaces': 1, // 禁止尾行空格
    'object-curly-spacing': [1, 'always'], // 大括号空格{_key: val_}
    'comma-spacing': 1, // 逗号后空格
    'spaced-comment': 1, // 注释斜杠后空格
    'space-before-block': 0, // 块前空格 if()_{}
    'switch-colon-spacing': 1, // switch -> case 0:_{}
    'brace-style': 1, // 左大括号不另起一行
    'block-spacing': 1, // function () {_aa()_}
    'key-spacing': 1, // 键值间空格 key:_val
    'new-cap': 1, // 构造函数首字母大写
    eqeqeq: 1, // 使用 ===
    // 'dot-notation': 1, // 强制使用.不用[]
  },
};
