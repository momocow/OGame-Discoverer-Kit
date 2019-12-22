import rootLogger from '@/logger'
import reports, { STORAGE_KEY as REPORTS_STORAGE_KEY } from './modules/reports'
import settings, { STORAGE_KEY as SETTINGS_STORAGE_KEY } from './modules/settings'

const logger = rootLogger.namespace('store')

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    reports,
    settings
  },
  actions: {
    load ({ dispatch }) {
      dispatch('reports/load')
      dispatch('settings/load')
      logger.info('loaded')
    },
    save ({ dispatch }) {
      dispatch('reports/save')
      dispatch('settings/save')
      logger.info('saved')
    }
  }
})

export default store

GM_addValueChangeListener(REPORTS_STORAGE_KEY, function (_1, _2, _3, remote) {
  if (remote) {
    logger.info('remote reports changed')
    store.dispatch('reports/load')
  }
})

GM_addValueChangeListener(SETTINGS_STORAGE_KEY, function (_1, _2, _3, remote) {
  if (remote) {
    logger.info('remote settings changed')
    store.dispatch('settings/load')
  }
})
