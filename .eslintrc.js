module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react',
        'react-hooks',
        'unused-imports',
        '@typescript-eslint',
        'import'
    ],
    rules: {
        'react/jsx-filename-extension': [
            2,
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
            }
        ],
        'no-unused-expressions': 'off',
        'react/jsx-indent': [2, 4],
        'import/no-unresolved': 'off',
        quotes: [2, 'single'],
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'off',
        indent: [2, 4],
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-indent-props': [2, 4],
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'unused-imports/no-unused-imports': 'error',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'react/no-array-index-key': 'off',
        'import/order': [
            'error',
            {
                groups: [
                    'external',
                    'builtin',
                    'internal',
                    'parent',
                    'sibling',
                    'object',
                    'type',
                    'index'
                ],
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'builtin'
                    },
                    {
                        pattern: '@**',
                        group: 'external',
                        position: 'after'
                    }
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ]
    },
    overrides: [
        {
            files: ['*.json', '*.jsonc'],
            rules: {
                quotes: [2, 'double']
            }
        }
    ]
};
