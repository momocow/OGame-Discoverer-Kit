import Vue from 'vue'
import ReportUnkown from '../src/components/ReportUnknown.vue'

const comp = new Vue(ReportUnkown)
comp.$mount('#app')

document.body.style.width = '100vw'
// document.body.style.width = '100vw'
document.body.style.height = '100vh'
comp.$el.style.position = 'absolute'
comp.$el.style.top = 'calc(50vh - 13px)'
comp.$el.style.left = 'calc(50vw - 13px)'
