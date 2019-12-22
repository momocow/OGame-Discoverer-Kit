import { DateTime } from 'luxon'
import KEYWORDS from './keywords'
import { ExpReport } from './models/ExpReport'
import { EVENT_TYPE, PROFIT_TYPE } from './enums'

export function * parseExpReports (text, locale, timezone, skip = new Set()) {
  for (const r of $(text).find('li.msg').toArray()) {
    const localeKeywords = KEYWORDS[locale]
    const $report = $(r)
    const msgId = $report.data('msg-id')

    if (skip.has(msgId)) { continue }

    const report = new ExpReport(msgId)

    report.time = DateTime.fromFormat(
      $report.find('.msg_date').text(),
      'dd.MM.yyyy HH:mm:ss',
      { zone: timezone }
    ).toMillis()

    let profitsComplete = false
    let profits
    for (const line of $report.find('.msg_content').html().split(/<br(?:| \/)>/)) {
      if (!report.eventType && !report.profitType) {
        if (line.includes(localeKeywords.resourcesProfit)) {
          report.eventType = EVENT_TYPE.PROFIT
          report.profitType = PROFIT_TYPE.RESOURCES
        } else if (line.includes(localeKeywords.fleetsProfit)) {
          report.eventType = EVENT_TYPE.PROFIT
          report.profitType = PROFIT_TYPE.FLEETS
        }
      }

      if (!profitsComplete) {
        if (report.profitType === PROFIT_TYPE.RESOURCES) {
          for (const [resourceKey, resourceName] of Object.entries(localeKeywords.resources)) {
            const tokens = line.split(' ')
            const resourceNameLineIndex = tokens.indexOf(resourceName)
            if (resourceNameLineIndex >= 0) {
              profits = {
                [resourceKey]: Number(tokens[resourceNameLineIndex + 1].replace(/,/g, ''))
              }
              profitsComplete = true
              break
            }
          }
        } else if (report.profitType === PROFIT_TYPE.FLEETS) {
          if (!line) {
            profitsComplete = true
          } else {
            for (const [fleetKey, fleetName] of Object.entries(localeKeywords.fleets)) {
              const tokens = line.split(':')
              if (tokens[0] === fleetName) {
                if (!profits) {
                  profits = {}
                }
                profits[fleetKey] = Number(tokens[1].trim())
                break
              }
            }
          }
        }
      }
    }
    if (profits) {
      report.profits = profits
    }
    yield report
  }
}
