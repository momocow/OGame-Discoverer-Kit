import { ENTER, EXIT } from './context'
import { entryReducer } from './fp'

export class GMRequestAborted extends Error {
  name = 'GMRequestAborted'
  constructor () {
    super('request aborted')
  }
}

export class GMRequestFailed extends Error {
  constructor () {
    super('request failed')
    this.name = 'GMRequestFailed'
  }
}

export class GMRequestTimeout extends Error {
  constructor () {
    super('request timeout')
    this.name = 'GMRequestTimeout'
  }
}

export async function request (options = {}) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      ...options,
      onabort (...args) {
        if (typeof options.onabort === 'function') {
          options.onabort(...args)
        }
        reject(new GMRequestAborted())
      },
      onerror (...args) {
        if (typeof options.onerror === 'function') {
          options.onerror(...args)
        }
        reject(new GMRequestFailed())
      },
      ontimeout (...args) {
        if (typeof options.ontimeout === 'function') {
          options.ontimeout(...args)
        }
        reject(new GMRequestTimeout())
      },
      onload (resp) {
        if (typeof options.onload === 'function') {
          options.onload(resp)
        }
        resolve(resp)
      }
    })
  })
}

export class GMTabStorage {
  constructor (store = {}) {
    this._defaultStore = store
  }

  async [ENTER] () {
    return new Promise(resolve => {
      GM_getTab(tab => resolve(
        Object.entries(this._defaultStore)
          .filter(([k]) => !(k in tab)) // find missings
          .reduce(entryReducer, tab) // apply default values
      ))
    })
  }

  [EXIT] (error, tab) {
    if (!error) {
      // save if no error
      GM_saveTab(tab)
    }
  }
}
