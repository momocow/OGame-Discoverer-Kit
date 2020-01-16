import { DateTime } from 'luxon'
import { EventEmitter } from 'events'

import KEYWORDS from './data/v2/keywords'
import { ExpeditionReport } from './data/v2/adapter'

export class ParserError extends Error {
  name = 'ParserError'
  constructor (messageId, ...args) {
    super(...args)
    this.messageId = messageId
  }
}

export class ConstructError extends ParserError {
  name = 'ConstructError'
  constructor (messageId, error) {
    super(messageId, error.message)
    this.origin = error
  }
}

export class AnalysisError extends ParserError {
  name = 'AnalysisError'
  constructor (report, error) {
    super(report.id, error.message)
    this.origin = error
    this.report = report
  }
}

export class SkipIteration extends Error {
  name = 'SkipIteration'
}

export class Decision {
  constructor (messageId) {
    this.messageId = messageId
    this._inner = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  continue () {
    this._resolve()
  }

  skip () {
    this._reject(new SkipIteration())
  }

  async wait () {
    return this._inner
  }
}

export class Parser extends EventEmitter {
  constructor (locale, timezone) {
    super()
    this.locale = locale
    this.timezone = timezone
    this.keywords = KEYWORDS[locale]
  }

  async parse (text) {
    for (const r of $(text).find('li.msg').toArray()) {
      const $report = $(r)
      const messageId = $report.data('msg-id')

      // confirm phase
      const decision = new Decision(messageId)
      this.emit('beforeparse', decision)
      try {
        await decision.wait()
      } catch (e) {
        // skip iteration
        continue
      }

      // construct phase
      let report = null
      try {
        report = new ExpeditionReport()
        report.id = messageId
      } catch (error) {
        this.emit('error', new ConstructError(messageId, error))
        continue
      }

      // analysis phase
      try {
        report.time = DateTime.fromFormat(
          $report.find('.msg_date').text(),
          'dd.MM.yyyy HH:mm:ss',
          { zone: this.timezone }
        ).toMillis()

        const c = $report.find('.msg_content').html()
          .replace(/<br(?: \/)?>/g, '\n')
        const content = $(c).text()
        for (const pattern of this.keywords.patterns) {
          if (pattern.test.test(content)) {
            report.event = pattern.event
            switch (pattern.event) {
              case 'Ship':
                for (const [, k, v] of content.matchAll(pattern.reduce)) {
                  if (k in this.keywords.ship) {
                    const shipId = this.keywords.ship[k]
                    const amount = Number(v.replace(/,/g, ''))
                    report.setProfit(shipId, amount)
                  }
                }
                break
              case 'Resource': {
                const matched = content.match(pattern.reduce)
                if (
                  matched &&
                  matched.length > 3 &&
                  matched[1] in this.keywords.resource
                ) {
                  const resourceId = this.keywords.resource[matched[1]]
                  const amount = Number(matched[2].replace(/,/g, ''))
                  report.setProfit(resourceId, amount)
                }
                break
              }
              case 'Item': {
                const matched = content.match(pattern.reduce)
                if (
                  matched &&
                  matched.length > 2 &&
                  matched[1] in this.keywords.item
                ) {
                  report.item = this.keywords.item[matched[1]]
                }
                break
              }
            }
            break
          }
        }
        report.validate()
        this.emit('parse', report)
      } catch (err) {
        this.emit('error', new AnalysisError(report, err))
        continue
      }
    }
  }
}
