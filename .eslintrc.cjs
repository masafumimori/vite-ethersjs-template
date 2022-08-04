module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index'
        ],
        'newlines-between': 'never',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: 'react**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '{@/libs/**,@/features/**,@/app/**}',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '{@/components/**,@/pages/**}',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: './**.module.css',
            group: 'index',
            position: 'after'
          }
        ]
      }
    ]
  }
};
