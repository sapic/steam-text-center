import neostandard from 'neostandard'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

const files = ['**/*.js', '**/*.vue']

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  ...neostandard({ noJsx: true, files: ['**/*.vue'] }),
  ...pluginVue.configs['flat/recommended'],
  {
    files,
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
      'vue/require-v-for-key': 'off',
      'vue/no-unused-components': ['error', { ignoreWhenBindingPresent: true }],
      'vue/multi-word-component-names': 'off',
    },
  },
]
