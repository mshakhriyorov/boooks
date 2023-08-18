import module from '@rushstack/eslint-patch/modern-module-resolution';

module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    'prettier',
  ],
  rules: {
    'vue/require-default-prop': 'off',
    'prettier/prettier': ['error'],
  },
};
