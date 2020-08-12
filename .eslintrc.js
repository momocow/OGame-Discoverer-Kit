const fs = require('fs')
const path = require('path')

const SRC_DIR = path.join(__dirname, 'userscripts')

const eslintConfigs = []

for (const subdir of fs.readdirSync(SRC_DIR)) {
    const eslintConfigFiles = [
        path.resolve(SRC_DIR, subdir, '.eslintrc.js'),
        path.resolve(SRC_DIR, subdir, '.eslintrc.json')
    ]
    for (const configFile of eslintConfigFiles) {
        if (fs.existsSync(configFile)) {
            eslintConfigs.push(configFile)
            console.log('Loading %s', configFile)
            break
        }
    }
  }

module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        ...eslintConfigs
    ],
    parserOptions: {
        ecmaFeatures: {
            "jsx": true
        },
        ecmaVersion: 2020,
        sourceType: "module"
    },
    plugins: [
        "react"
    ],
    globals: {
        "OGDK_NAME": "readonly",
        "OGDK_VERSION": "readonly",
        "OGDK_NAMESPACE": "readonly",
        "GM_getValue": "readonly"
    }
}
