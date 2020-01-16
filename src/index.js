// import store from './store'
import router from './router'
import menuItems from './menu'
import logger from './logger'

(function () {
  // window.addEventListener('beforeunload', () => store.dispatch('settings/save'))
  // store.dispatch('settings/load')
  for (const cmd in menuItems) {
    logger.debug('menu command (%s)', cmd)
    GM_registerMenuCommand(cmd, menuItems[cmd])
  }

  $(router(new URL(location.href)))
})()
