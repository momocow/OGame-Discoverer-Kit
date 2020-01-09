import { ValueError } from '../errors'
import { PROFIT_TYPE, EVENT_TYPE, REPORT_TYPE } from '../encode'
import { Report } from './Report'

export class ExpReport extends Report {
  constructor (msgId) {
    super(msgId, REPORT_TYPE.EXPEDITION)
    Object.assign(this._store, {
      eventType: EVENT_TYPE.UNDEFINED,
      version: 1
    })
  }

  get eventType () {
    return this._store.eventType
  }

  set eventType (value) {
    if (!Object.values(EVENT_TYPE).includes(value)) {
      throw new ValueError('eventType should be one of the enum EVENT_TYPE')
    }
    this._store.eventType = value
  }

  get profitType () {
    return this._store.profitType
  }

  set profitType (value) {
    if (!Object.values(PROFIT_TYPE).includes(value)) {
      throw new ValueError('profitType should be one of the enum PROFIT_TYPE')
    }
    this._store.profitType = value
  }

  get profits () {
    return this._store.profits
  }

  set profits (value) {
    if (typeof value !== 'object') {
      throw new ValueError('profits should be an object')
    }

    if (!Object.values(value).every(item => typeof item === 'number')) {
      throw new ValueError('values of the profits object should be numbers')
    }

    this._store.profits = value
  }

  get losses () {
    return this._store.losses
  }

  set losses (value) {
    if (typeof value !== 'object') {
      throw new ValueError('losses should be an object')
    }

    if (!Object.values(value).every(item => typeof item === 'number')) {
      throw new ValueError('values of the losses object should be numbers')
    }

    this._store.losses = value
  }
}
