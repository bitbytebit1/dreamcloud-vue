module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/attributes-order': 'error',
    'vue/script-indent': 'error',
    'vue/html-closing-bracket-newline': ['error', { multiline: 'always' }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}