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
    'https://gist.githubusercontent.com/momocow/31707058ac783f45d00a01a6fe900326/raw/emago-userscript.js'
  ],
  grant: [
    'GM_listValues'
  ]
}
