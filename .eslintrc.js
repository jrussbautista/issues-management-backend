module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/extensions': ['off', 'ignorePackages'],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
  },
};
