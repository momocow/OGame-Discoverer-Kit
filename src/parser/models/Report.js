import { REPORT_TYPE } from '../enums'
import { ValueError } from '../errors'

export class Report {
  constructor (msgId, reportType = REPORT_TYPE.UNDEFINED) {
    if (typeof msgId !== 'number' || !(msgId > 0)) {
      // do not use msgId <= 0 since it will always evaluate to false when comparing with NaN
      throw new ValueError('msgId should be a positive number')
    }

    if (!Object.values(REPORT_TYPE).includes(reportType)) {
      throw new ValueError('reportType should be one of the enum REPORT_TYPE')
    }

    this._store = {
      msgId,
      reportType,
      time: NaN,
      version: NaN // report format version
    }
  }

  toJSON () {
    return this._store
  }

  get msgId () {
    return this._store.msgId
  }

  get version () {
    return this._store.version
  }

  get reportType () {
    return this._store.reportType
  }

  get time () {
    return this._store.time
  }

  set time (value) {
    if (typeof value !== 'number') {
      throw new ValueError('time should be a number')
    }
    this._store.time = value
  }
}
