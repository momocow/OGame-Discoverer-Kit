import rootLogger from '@/logger'
import SERVERS from '@/store/servers.json'
import { universe, language, playerId } from '@/env'

const logger = rootLogger.namespace('store/settings')

const defaultSettings = SERVERS[language]
export const STORAGE_KEY = `${language}-${universe}-${playerId}-settings`

export default {
  namespaced: true,
  state: {
    timezone: defaultSettings.timezone,
    locale: defaultSettings.locale
  },
  mutations: {
    setTimezone (state, payload) {
      state.timezone = payload.timezone
    },
    setLocale (state, payload) {
      state.locale = payload.locale
    }
  },
  actions: {
    load ({ commit }) {
      const data = GM_getValue(STORAGE_KEY)
      if (data) {
        const { timezone, locale } = data
        commit('setTimezone', { timezone })
        commit('setLocale', { locale })

        logger.info('settings loaded')
        logger.info('- timezone: %s', timezone)
        logger.info('- locale: %s', locale)
      }
    },
    save ({ state }) {
      GM_setValue(STORAGE_KEY, {
        timezone: state.timezone,
        locale: state.locale
      })
    }
  }
}
