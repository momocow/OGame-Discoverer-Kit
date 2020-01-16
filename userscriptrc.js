const DEV = process.env.WEBPACK_DEV_SERVER === 'true'

module.exports = {
  name: 'OGDK: OGame Discoverer Kit 🚀',
  version: DEV ? '[version].dev.[buildTime]' : '[version]',
  namespace: 'code.cow.moe',
  include: 'https://*.ogame.gameforge.com/game/index.php?*',
  updateURL: 'https://cow.moe/OGame-Discoverer-Kit/dist/ogame-discoverer-kit.meta.js',
  downloadURL: 'https://cow.moe/OGame-Discoverer-Kit/dist/ogame-discoverer-kit.user.js',
  supportURL: 'https://github.com/momocow/OGame-Discoverer-Kit/issues',
  'run-at': 'document-body',
  require: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11',
    'https://unpkg.com/vue-i18n@8.15.3/dist/vue-i18n.min.js',
    'https://unpkg.com/vuex@3.1.2/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/ajv@6.10.2/dist/ajv.min.js'
  ],
  grant: [
    'unsafeWindow',
    'GM_getTab',
    'GM_saveTab',
    'GM_setValue',
    'GM_getValue',
    'GM_deleteValue',
    'GM_addValueChangeListener',
    'GM_xmlhttpRequest',
    'GM_registerMenuCommand'
  ],
  connect: [
    'api.inazuma.love'
  ]
}
