const { eslintWebConfig } = require('@2600hz/commio-native-utilities');

const config = eslintWebConfig(__dirname);
config.rules = {
  ...config.rules,
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
      pathGroups: [
        {
          pattern: 'react',
          group: 'external',
          position: 'before',
        },
        {
          pattern: '@/**',
          group: 'parent',
          position: 'before',
        },
        {
          pattern: '@**/**',
          group: 'parent',
          position: 'before',
        },
      ],
      pathGroupsExcludedImportTypes: ['react'],
      'newlines-between': 'never',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
  // 'import/order': 'off',
  'react/jsx-uses-react': 'warn',
  // 'react/react-in-jsx-scope': 'warn',
  'react/react-in-jsx-scope': 'off',
  '@typescript-eslint/no-unsafe-argument': 'warn',
  '@typescript-eslint/no-unsafe-assignment': 'warn',
  '@typescript-eslint/no-unsafe-call': 'warn',
  '@typescript-eslint/no-unsafe-member-access': 'warn',
  '@typescript-eslint/no-unsafe-return': 'warn',
  'react/require-default-props': 'warn',
  '@typescript-eslint/strict-boolean-expressions': 'warn',
  // 'max-len': 'off',
  'react/function-component-definition': [
    'error',
    { namedComponents: 'arrow-function' },
  ],
};

module.exports = config;
