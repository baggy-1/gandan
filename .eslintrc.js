module.exports = {
  root: true,
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
