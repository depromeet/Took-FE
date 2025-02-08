const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ['@typescript-eslint', 'import'],
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'no-duplicate-imports': 'error',
    'import/no-cycle': [
      'error',
      {
        maxDepth: Infinity,
        ignoreExternal: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-redeclare': 'error',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'no-console': ['warn', { allow: ['warn', 'error', 'table'] }],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-undef': 'off',
    'no-redeclare': 'off',
    'no-unused-vars': 'off',
  },
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
  extends: [
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  env: {
    node: true,
    browser: true,
  },
  ignorePatterns: ['.*.js', 'node_modules/'],
};
