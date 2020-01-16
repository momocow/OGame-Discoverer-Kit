import { Logger } from './utils/logger'
import { using } from './utils/context'
import { GMTabStorage } from './utils/gm'
import logger from './logger'

export default {
  async 'Toggle log verbosity on the current tab 📝' () {
    const { WARNING, DEBUG } = Logger.LEVELS
    await using(
      new GMTabStorage({ logLevel: WARNING }),
      function transaction (tab) {
        if (tab.logLevel === WARNING) {
          tab.logLevel = DEBUG
        } else if (tab.logLevel === DEBUG) {
          tab.logLevel = WARNING
        }
        logger.level = tab.logLevel
      }
    )
  }
}
