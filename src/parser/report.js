import { ValueError } from './errors'
import { EventType, Ship } from './encode'

export class ExpeditionReport {
  static version = 2

  constructor () {
    this._store = {
      i: undefined, // number
      t: undefined, // number
      e: undefined, // number
      p: undefined, // object {[type: number]: [value: number]}
      v: undefined
    }
  }

  get messageId () {
    return this._store.i
  }

  get time () {
    return this._store.t
  }

  get event () {
    return EventType[this._store.e]
  }

  get ships () {
    return Object.entries(this._store.s)
      .map(([k, v]) => [Ship[k], v])
      .reduce(
        (s, [k, v]) => Object.assign(s, { [k]: v }),
        {}
      )
  }

  get resourceType () {
    return this._store.r
  }

  get resourceValue () {
    return this._store.r
  }

  validate () {
    return this
  }

  toJSON () {
    return this.validate()._store
  }

  static fromJSON (store) {
    const report = new Report()
    report._store = store
    return report.validate()
  }
}
