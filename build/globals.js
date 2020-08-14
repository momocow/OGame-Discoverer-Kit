const path = require('path')

const PKG_JSON = require('../package.json')
const ROOT_DIR = path.resolve(__dirname, '..')

global.ROOT_DIR = ROOT_DIR
global.PKG_JSON = PKG_JSON
global.NAMESPACE = 'cow.moe'

module.exports = {
  OGDK_NAME: PKG_JSON.name,
  OGDK_VERSION: PKG_JSON.version,
  OGDK_NAMESPACE: global.NAMESPACE
}
