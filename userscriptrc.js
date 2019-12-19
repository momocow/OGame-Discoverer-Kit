const DEV = process.env.WEBPACK_DEV_SERVER === 'true'

module.exports = {
  name: 'OGEK: OGame Explorer Kit 🚀',
  version: DEV ? '[version].dev.[buildTime]' : '[version]',
  namespace: 'code.cow.moe',
  include: 'https://*.ogame.gameforge.com/game/index.php?*',
  updateURL: '',
  downloadURL: '',
  supportURL: '',
  'run-at': 'document-body',
  require: 'https://cdn.jsdelivr.net/npm/vue@2.6.11'
}
