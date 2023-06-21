/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    semi: [2, 'always'],
    indent: [2, 2],
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }]
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
