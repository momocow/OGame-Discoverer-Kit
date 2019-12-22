import Dashboard from '@/components/Dashboard.vue'
import store from '@/store'
import { parseExpReports } from '@/parser'
import rootLogger from '@/logger'
const logger = rootLogger.namespace('router/messages')

function initDashboard (containerId) {
  logger.debug('injecting dashborad')
  $(`#${containerId} > #fleetsgenericpage`).prepend('<div id="ogdk-dashboard"></div>')
  const dashboardComponent = new Vue({
    ...Dashboard,
    i18n: new VueI18n({ locale: store.state.settings.locale }),
    store
  })
  dashboardComponent.$mount('#ogdk-dashboard')
}

function watchExpSubtab () {
  logger.debug('start watching expedition tab onload')
  const subtabElementId = $('#fleetsTab ul.subtabs > li#subtabs-nfFleet22').attr('aria-controls')
  const expSubtabObserver = new MutationObserver(() => {
    logger.debug('subtab content mutated')
    initDashboard(subtabElementId)
  })
  expSubtabObserver.observe($(`#${subtabElementId}`).get(0), { childList: true })
  return expSubtabObserver
}

function initReports () {
  logger.debug('start watching ajax success')

  $(document).ajaxSuccess((_1, _2, response, responseText) => {
    const searchParams = response.type === 'GET' ? new URL(response.url, location.href).searchParams
      : response.type === 'POST' ? new URLSearchParams(response.data)
        : null
    if (searchParams && (searchParams.get('tab') || searchParams.get('tabid')) === '22') {
      logger.debug('parsing expedition reports')

      let reportCount = 0
      for (const report of parseExpReports(
        responseText,
        store.state.settings.locale,
        store.state.settings.timezone,
        new Set(Object.keys(store.state.reports.expedition))
      )) {
        store.commit('reports/addReport', { report })
        reportCount++
      }
      logger.debug('%d new expedition report loaded', reportCount)
    }
  })
}

export default function () {
  window.addEventListener('beforeunload', () => store.dispatch('reports/save'))
  store.dispatch('reports/load')

  initReports()

  const tabElementId = $('ul.tabs_btn > li#tabs-nfFleets').attr('aria-controls')
  const tabElement = $(`#${tabElementId}`)
  let expSubtabObserver = tabElement.children().length > 0 ? watchExpSubtab() : null
  const fleetsTabObserver = new MutationObserver(() => {
    logger.debug('tab content mutated')
    if (expSubtabObserver) { expSubtabObserver.disconnect() }
    expSubtabObserver = watchExpSubtab()
  })
  fleetsTabObserver.observe(tabElement.get(0), { childList: true })
}
