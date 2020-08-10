const fs = require('fs')
const path = require('path')

const SRC_DIR = path.join(__dirname, 'src')

const wpConfigs = []

for (const subdir of fs.readdirSync(SRC_DIR)) {
  const wpContextDir = path.join(SRC_DIR, subdir)
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
