module.exports = {
    parser: '@babel/eslint-parser',
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            'jsx': true
        },
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    globals: {
        'OGDK_NAME': 'readonly',
        'OGDK_VERSION': 'readonly',
        'OGDK_NAMESPACE': 'readonly',
        'GM_getValue': 'readonly',
        'GM_listValues': 'readonly',
        "GM_registerMenuCommand": "readonly",
        "unsafeWindow": "readonly"
    },
    overrides: [
        {
            files: [ '*.test.js' ],
            plugins: [ 'jest' ],
            extends: [ 'plugin:jest/recommended' ]
        }
    ]
}
