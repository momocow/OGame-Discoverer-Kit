import store from './store'
import router from './router'
import { page } from './env'

(async function () {
  window.addEventListener('beforeunload', () => store.dispatch('settings/save'))
  store.dispatch('settings/load')
  $(router(page))
})()
