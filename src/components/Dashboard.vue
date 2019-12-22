<i18n locale="zh-TW" lang="yaml">
  title: 遠征收益統計
  resources-profit: 資源收益
  fleets-profit: 艦隊收益
</i18n>
<template>
  <div class="ogdk-dashboard" id="ogdk-dashboard">
    <div class="ogdk-dashboard-title">{{$t("title")}}</div>
    <div class="ogdk-dashboard-content">
      <div class="ogdk-control">
        <datetime class="ogdk-inline"
          type="datetime"
          :max-datetime="filterEnd"
          v-model="filterStart"
          @click="onDatetimeOpen"
          @focus="onDatetimeOpen"
          @close="onDatetimeClose"
          />
        -
        <datetime class="ogdk-inline"
          type="datetime"
          :min-datetime="filterStart"
          v-model="filterEnd"
          @click="onDatetimeOpen"
          @focus="onDatetimeOpen"
          @close="onDatetimeClose"
          />
      </div>
      <div class="ogdk-stat">
        <div class="ogdk-stat-title">{{$t('resources-profit')}}</div>
        <div class="ogdk-stat-body">
          <profit-table :data="resources"></profit-table>
        </div>
      </div>
      <div class="ogdk-stat">
        <div class="ogdk-stat-title">{{$t('fleets-profit')}}</div>
        <div class="ogdk-stat-body">
          <profit-table :data="fleets"></profit-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DateTime } from 'luxon'
import VueDatetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.min.css'
import { today, tomorrow } from '@/utils/datetime'
import ProfitTable from '@/components/ProfitTable.vue'
import rootLogger from '@/logger'
import { EVENT_TYPE, PROFIT_TYPE } from '@/parser/enums'
const logger = rootLogger.namespace('dashboard')
Vue.use(VueDatetime)
export default {
  name: 'ogdk-dashboard',
  components: {
    // datetime: VueDatetime,
    ProfitTable
  },
  computed: {
    resources () {
      const startTime = new Date(this.filterStart).getTime()
      const endTime = new Date(this.filterEnd).getTime()
      return this.$store.getters['reports/expeditions']
        .filter(r => r.eventType === EVENT_TYPE.PROFIT &&
          r.profitType === PROFIT_TYPE.RESOURCES)
        .filter(r => r.time >= startTime && r.time <= endTime)
        .map(r => r.profits)
        .reduce((profits, r) => {
          for (const [resName, resValue] of Object.entries(r)) {
            if (!profits[resName]) {
              profits[resName] = 0
            }
            profits[resName] += resValue
          }
          return profits
        }, {
          metal: 0,
          crystal: 0,
          deuterium: 0,
          darkmatter: 0
        })
    },
    fleets () {
      const startTime = new Date(this.filterStart).getTime()
      const endTime = new Date(this.filterEnd).getTime()
      return this.$store.getters['reports/expeditions']
        .filter(r => r.eventType === EVENT_TYPE.PROFIT &&
          r.profitType === PROFIT_TYPE.FLEETS)
        .filter(r => r.time >= startTime && r.time <= endTime)
        .map(r => r.profits)
        .reduce((profits, r) => {
          for (const [resName, resValue] of Object.entries(r)) {
            if (!profits[resName]) {
              profits[resName] = 0
            }
            profits[resName] += resValue
          }
          return profits
        }, {
          202: 0,
          203: 0,
          204: 0,
          205: 0,
          206: 0,
          207: 0,
          210: 0,
          215: 0,
          211: 0,
          213: 0,
          218: 0,
          219: 0
        })
    },
    timezone () {
      return this.$store.state.settings.timezone
    }
  },
  data () {
    const now = new Date()
    return {
      filterStart: DateTime.fromJSDate(today(now)).setZone(this.timezone).toISO(),
      filterEnd: DateTime.fromJSDate(tomorrow(now)).setZone(this.timezone).toISO()
    }
  },
  methods: {
    onDatetimeOpen () {
      this._tmpNewMsgCountZIndex = $('.new_msg_count').css('z-index')
      $('.new_msg_count').css('z-index', 0)
      this._tmpEventboxContentZIndex = $('#eventboxContent').css('z-index')
      $('#eventboxContent').css('z-index', 0)
    },
    onDatetimeClose () {
      $('.new_msg_count').css('z-index', this._tmpNewMsgCountZIndex)
      $('#eventboxContent').css('z-index', this._tmpEventboxContentZIndex)
    }
  }
}
</script>
<style scoped>
.ogdk-dashboard {
  background-color: rgba(13,16,20,0.5);
  border-radius: 4px;
  margin-bottom: 5px;
  border: inset #2e3641 2px;
  margin-top: 45px;
}
.ogdk-dashboard-title {
  color: #6f9fc8;
  padding: 4px
}
.ogdk-dashboard-content {
  background: linear-gradient(to bottom, #192026 0, #0d1014 30px, #0d1014 100%);
  padding: 4px;
  width: calc(100% - 10px);
  margin-left: 1px;
  height: calc(100% - 31px);
}
.ogdk-stat {
  padding: 4px;
}
.ogdk-stat-title {
  color: #6f9fc8;
}
.ogdk-stat-body {
  padding: 8px;
}
.ogdk-inline {
  display: inline-block;
}
.ogdk-control {
  text-align: center;
}
</style>
