const fs = require('fs')
const path = require('path')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const { inspect } = require('util')
const mergeWith = require('lodash/mergeWith')

const G = require('./build/globals')

const ENTRY_DIR = path.join(global.ROOT_DIR, 'userscripts')

function concatArray (objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

function commonConfig () {
  return {
    resolve: {
      alias: {
        '@lib': path.resolve(global.ROOT_DIR, 'lib')
      }
    },
    plugins: [
      new DefinePlugin(G)
    ]
  }
}

const wpConfigs = []

for (const subdir of fs.readdirSync(ENTRY_DIR)) {
  const wpContextDir = path.join(ENTRY_DIR, subdir)
  const wpConfigFile = path.join(wpContextDir, 'webpack.config.js')
  if (fs.existsSync(wpConfigFile)) {
    console.log('Loading %s', wpConfigFile)
    let wpConfigList = require(wpConfigFile)
    if (!Array.isArray(wpConfigList)) {
      wpConfigList = [wpConfigList]
    }
    for (const wpConfig of wpConfigList) {
      wpConfigs.push(mergeWith(
        wpConfig,
        { context: wpContextDir },
        commonConfig(),
        concatArray
      ))
    }
  }
}

console.debug(inspect(wpConfigs, {colors: true, depth: 5}))
module.exports = wpConfigs
