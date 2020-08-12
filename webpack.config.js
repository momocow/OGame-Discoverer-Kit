const fs = require('fs')
const path = require('path')
const DefinePlugin = require('webpack/lib/DefinePlugin')

const ROOT_DIR = path.resolve(__dirname)
const ENTRY_DIR = path.join(__dirname, 'userscripts')
const PKG_JSON = require('./package.json')

global.ROOT_DIR = ROOT_DIR
global.PKG_JSON = PKG_JSON
global.NAMESPACE = 'cow.moe'

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
      wpConfigs.push({
        ...wpConfig,
        context: wpContextDir,
        plugins: [
          ...wpConfig.plugins ?? [],
          new DefinePlugin({
            OGDK_NAME: PKG_JSON.name,
            OGDK_VERSION: PKG_JSON.version,
            OGDK_NAMESPACE: global.NAMESPACE
          })
        ]
      })
    }
  }
}

module.exports = wpConfigs
