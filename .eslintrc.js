module.exports = {
    root: true,
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:react-native/all',
      'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-native/no-inline-styles': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error']
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  };