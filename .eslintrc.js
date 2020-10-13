module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ['standard', 'plugin:vue/recommended'],
  // required to lint *.vue files
  plugins: ['standard', 'vue'],
  // add your custom rules here
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single'],
    'space-before-function-paren': ['error', 'always'],
    'vue/require-v-for-key': 'off',
    'vue/no-unused-components': ['error', {
      ignoreWhenBindingPresent: true,
    }],
  },
  globals: {},
}
