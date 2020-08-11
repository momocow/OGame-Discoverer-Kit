const OGDK_DEV = process.env.OGDK_DEV

const LIB_REACT = OGDK_DEV
  ? 'https://unpkg.com/react@16/umd/react.development.js'
  : 'https://unpkg.com/react@16/umd/react.production.min.js'

const LIB_REACT_DOM = OGDK_DEV
  ? 'https://unpkg.com/react-dom@16/umd/react-dom.development.js'
  : 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'

module.exports = {
  name: 'OGDK: Revenue 📈',
  version: OGDK_DEV ? '[version].dev.[buildTime]' : '[version]',
  namespace: 'cow.moe',
  include: 'https://*.ogame.gameforge.com/game/index.php?*',
  updateURL: OGDK_DEV ? '' : 'https://cow.moe/OGame-Discoverer-Kit/dist/ogdk-revenue.meta.js',
  downloadURL: OGDK_DEV ? '' : 'https://cow.moe/OGame-Discoverer-Kit/dist/ogame-discoverer-kit.user.js',
  supportURL: 'https://github.com/momocow/OGame-Discoverer-Kit/issues',
  'run-at': 'document-body',
  require: [
    'https://gist.githubusercontent.com/momocow/31707058ac783f45d00a01a6fe900326/raw/c7f09ee5528b53be853482a90118f64bc8f07d6f/emago.js',
    LIB_REACT,
    LIB_REACT_DOM
  ]
}
