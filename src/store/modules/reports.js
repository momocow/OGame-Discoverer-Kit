import rootLogger from '@/logger'
import { universe, language, playerId } from '@/env'
import { REPORT_TYPE } from '@/parser/data/v2/encode'

const logger = rootLogger.namespace('store/reports')

export const STORAGE_KEY = `${language}-${universe}-${playerId}-reports`

export default {
  namespaced: true,
  state: {
    expedition: {}
  },
  mutations: {
    _setRepo (state, payload) {
      state[payload.name] = {
        ...state[payload.name],
        ...payload.repo
      }
    },
    addReport (state, payload) {
      const reportEntry = { [payload.report.msgId]: payload.report }
      switch (payload.report.reportType) {
        case REPORT_TYPE.EXPEDITION:
          state.expedition = {
            ...state.expedition,
            ...reportEntry
          }
          break
      }
    }
  },
  getters: {
    expeditions: (state) => Object.values(state.expedition)
  },
  actions: {
    load ({ commit }) {
      const data = GM_getValue(STORAGE_KEY)
      if (data) {
        for (const [name, repo] of Object.entries(data)) {
          commit('_setRepo', { name, repo })
          logger.info('%d %s reports loaded', Object.keys(repo).length, name)
        }
      }
    },
    save ({ state }) {
      GM_setValue(STORAGE_KEY, {
        expedition: state.expedition
      })
      logger.info('%d expedition reports saved', Object.keys(state.expedition).length)
    }
  }
}
