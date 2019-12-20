const DEV = process.env.WEBPACK_DEV_SERVER === 'true'

module.exports = {
  name: 'OGDK: OGame Discoverer Kit 🚀',
  version: DEV ? '[version].dev.[buildTime]' : '[version]',
  namespace: 'code.cow.moe',
  include: 'https://*.ogame.gameforge.com/game/index.php?*',
  updateURL: '',
  downloadURL: '',
  supportURL: '',
  'run-at': 'document-body',
  require: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11',
    'https://unpkg.com/vue-i18n@8.15.3/dist/vue-i18n.min.js'
  ],
  grant: 'unsafeWindow'
}
