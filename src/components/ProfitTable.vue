<i18n locale="zh-TW" lang="yaml">
  metal: "金屬"
  crystal: "晶體"
  deuterium: "重氫"
  darkmatter: "暗物質"
  202: "小型運輸艦"
  203: "大型運輸艦"
  204: "輕型戰鬥機"
  205: "重型戰鬥機"
  206: "巡洋艦"
  207: "戰列艦"
  210: "間諜衛星"
  215: "戰鬥巡洋艦"
  211: "導彈艦"
  213: "毀滅者"
  218: "惡魔飛船"
  219: "探路者"
</i18n>
<template>
  <table class="ogdk-table">
    <tr v-for="key in Object.keys(data)" :key="key">
      <th>{{$t(key)}}</th>
      <td>{{toOGameNumber(data[key])}}</td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'ogdk-table',
  props: {
    data: Object
  },
  methods: {
    toOGameNumber (num, groupDigit = 3, delimiter = ',') {
      if (num === 0) {
        return 0
      }

      let str = ''
      const groupDigitValue = Math.pow(10, groupDigit)
      for (; num > 0; num = parseInt(num / groupDigitValue)) {
        const subDigits = num / groupDigitValue < 1 ? String(num % groupDigitValue)
          : ',' + String(num % groupDigitValue).padStart(groupDigit, '0')
        str = subDigits + str
      }
      return str
    }
  }
}
</script>
<style scoped>
.ogdk-table th {
  text-align: left;
  width: 80px;
  padding: 0 5px;
}
.ogdk-table td {
  text-align: left;
  padding: 0 5px;
}
.ogdk-table tr:hover {
  color: rgb(244, 225, 94);
}
</style>
