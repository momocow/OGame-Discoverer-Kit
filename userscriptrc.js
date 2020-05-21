const DEV = process.env.WEBPACK_DEV_SERVER === 'true'
const DOMAIN = 'cow.moe'

module.exports = {
  name: 'OGame Discoverer Kit 🚀',
  version: DEV ? '[version].dev.[buildTime]' : '[version]',
  namespace: DOMAIN,
  include: 'https://*.ogame.gameforge.com/game/index.php?*',
  updateURL: DEV ? '' : `https://${DOMAIN}/OGame-Discoverer-Kit/dist/ogame-discoverer-kit.meta.js`,
  downloadURL: DEV ? '' : `https://${DOMAIN}/OGame-Discoverer-Kit/dist/ogame-discoverer-kit.user.js`,
  supportURL: 'https://github.com/momocow/OGame-Discoverer-Kit/issues',
  'run-at': 'document-body',
  require: [
    // 'https://cdn.jsdelivr.net/npm/ajv@6.10.2/dist/ajv.min.js',
    // 'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js'
  ],
  grant: [
    'GM_listValues'
  ]
}
