const fs = require('fs')
const path = require('path')

const ROOT_DIR = path.resolve(__dirname)
const ENTRY_DIR = path.join(__dirname, 'userscripts')

global.ROOT_DIR = ROOT_DIR

const wpConfigs = []

for (const subdir of fs.readdirSync(ENTRY_DIR)) {
  const wpContextDir = path.join(ENTRY_DIR, subdir)
  const wpConfigFile = path.join(wpContextDir, 'webpack.config.js')
  if (fs.existsSync(wpConfigFile)) {
    console.log('Loading %s', wpConfigFile)
    wpConfigs.push({
      ...require(wpConfigFile),
      context: wpContextDir
    })
  }
}

module.exports = wpConfigs
