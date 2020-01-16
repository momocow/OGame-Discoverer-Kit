import {
  event,
  resource,
  ship,
  item
} from './encode'
import {
  entryReducer,
  entryKeyMap
} from '@/utils/fp'
import schema from './schema.json'

export class ExpeditionReport {
  static version = 2
  static validator = new Ajv().compile(schema)

  _store = {}

  get id () {
    return this._store.i
  }

  set id (value) {
    this._store.i = value
  }

  get time () {
    return this._store.t
  }

  set time (value) {
    this._store.t = value
  }

  get event () {
    return event[this._store.e]
  }

  set event (value) {
    this._store.t = typeof value === 'number' ? value
      : event[value]
  }

  get profits () {
    return Object.entries(this._store.p || {})
      .map(entryKeyMap(k => ship[k]))
      .reduce(entryReducer, {})
  }

  set profits (value) {
    Object.entries(value)
      .forEach(([k, v]) => this.setProfit(k, v))
  }

  setProfit (ptype, value) {
    if (typeof this._store.p !== 'object') {
      this._store.p = {}
    }
    if (typeof ptype === 'string') {
      ptype = ptype in resource ? resource[ptype] : ship[ptype]
    }
    this._store.p[ptype] = value
  }

  get item () {
    return typeof this._store.m === 'number' ? item[this._store.m]
      : undefined
  }

  set item (value) {
    this._store.m = typeof value === 'number' ? value
      : item[value]
  }

  validate () {
    if (!Object.isFrozen(this._store)) {
      if (!ExpeditionReport.validator(this._store)) {
        throw new Ajv.ValidationError(
          ExpeditionReport.validator.errors
        )
      }
      Object.freeze(this._store)
    }
    return this
  }

  toJSON () {
    this.validate()
    return this._store
  }

  static fromJSON (store) {
    const report = new ExpeditionReport()
    report._store = store
    return report.validate()
  }
}
