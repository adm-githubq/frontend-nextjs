module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    "next/core-web-vitals",
    "next",
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    'react-hooks',
    'prettier',
    'simple-import-sort',
    'import',
    '@typescript-eslint'
  ],
  rules: {
    "@typescript-eslint/no-unsafe-assignment": 2,
    "@typescript-eslint/no-unsafe-member-access": 2,
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/no-unsafe-call": 2,
    "@typescript-eslint/no-unsafe-argument": 2,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/require-await": 0,
    "@typescript-eslint/no-floating-promises": 2,
    "@typescript-eslint/no-dupe-class-members": 2,
    "@typescript-eslint/restrict-template-expressions": 2,
    "@typescript-eslint/no-unsafe-return": 2,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(assets|modules|pages|theme|utils|services|hooks|hoc|types|core|contexts|dictionary|components|screens|constants)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$']
        ]
      }
    ],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    "react-hooks/exhaustive-deps": 'off',

    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-empty-function': 'off',
    // ignore unused arguments if they match the pattern
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // https://stackoverflow.com/questions/66773897/react-using-typescript-dont-use-as-a-type
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false
        }
      }
    ],
    'comma-dangle': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-shadow.md
    // note you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',
    // disable eslint rule and rely on prettier for indenting
    indent: 'off',
    'no-empty-function': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'always', prev: 'block-like', next: 'block-like' },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: ['const', 'let', 'var']
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
