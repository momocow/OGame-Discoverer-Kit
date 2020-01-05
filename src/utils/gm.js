export class GMRequestAborted extends Error {
  constructor () {
    super('request aborted')
    this.name = 'GMRequestAborted'
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
