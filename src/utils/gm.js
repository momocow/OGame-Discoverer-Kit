export class GMRequestAborted extends Error {
  name = 'GMRequestAborted'
  constructor () {
    super('request aborted')
  }
}

export class GMRequestFailed extends Error {
  name = 'GMRequestFailed'
  constructor () {
    super('request failed')
  }
}

export class GMRequestTimeout extends Error {
  name = 'GMRequestTimeout'
  constructor () {
    super('request timeout')
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
}
