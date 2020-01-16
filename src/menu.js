import { Logger } from './utils/logger'
import logger from './logger'

const pTab = new Promise((resolve) => GM_getTab(resolve))

export default {
  async 'Toggle log verbosity on this tab 📝' () {
    const tab = await pTab
    if (typeof tab.logLevel === 'undefined') {
      tab.logLevel = logger.levelNo
    }

    if (tab.logLevel === Logger.LEVELS.WARNING) {
      tab.logLevel = Logger.LEVELS.DEBUG
    } else if (tab.logLevel === Logger.LEVELS.DEBUG) {
      tab.logLevel = Logger.LEVELS.WARNING
    }

    logger.level = tab.logLevel

    GM_saveTab(tab)
  }
}
