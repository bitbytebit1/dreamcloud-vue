module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/html-indent': [
      'error',
      'tab'
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}