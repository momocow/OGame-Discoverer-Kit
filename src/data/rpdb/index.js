import { request as gmRequest } from '@/utils/gm'

// const API_URL = 'https://api.inazuma.love/ogame/rpdb'

export class StorageError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'StorageError'
  }
}

export class RemoteError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'RemoteError'
  }
}

export class RemoteFailed extends RemoteError {
  constructor (code, msg) {
    super(msg)
    this.name = 'RemoteFailed'
    this.code = code
  }
}

export class VersionError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'VersionError'
  }
}

/**
 * @typedef {Object} RpdbClientOptions
 * @property {Funtion} [request]
 * @property {Funtion} [getValue]
 * @property {Funtion} [setValue]
 * @property {Funtion} [deleteValue]
 */
export class RpdbClient {
  static STORAGE_PREFIX = 'rpdb'
  static STORAGE_VERS = 1
  static DEF_VERS = 1
  static endpoints = {
    VERS: 'vers',
    SYNC: 'sync'
  }

  static instances = {}

  /**
   * @param {URL} url
   * @param {RpdbClientOptions} [options]
   */
  constructor (url, options = {}) {
    this.url = url
    this.request = async (...args) => RpdbClient.assertResponse(
      typeof options.request === 'function' ? await options.request(...args)
        : await gmRequest(...args)
    )

    this.getValue = typeof options.getValue === 'function' ? options.getValue
      : GM_getValue // eslint-disable-line camelcase

    this.setValue = typeof options.setValue === 'function' ? options.setValue
      : GM_setValue // eslint-disable-line camelcase

    this.deleteValue = typeof options.deleteValue === 'function' ? options.deleteValue
      : GM_deleteValue // eslint-disable-line camelcase

    this.options = Object.assign({}, options, {
      async request (...args) {
        return RpdbClient.assertResponse(
          await options.request(...args)
        )
      }
    })

    // storage
    this._store = []
  }

  async sync () {
    const remoteDataVers = await this.getRemoteDataVersion()
    if (remoteDataVers > this.dataVersion) {
      const backup = this._store
      await this.syncRemoteData()
      if (remoteDataVers > this.dataVersion) {
        // buggy sync, recover backup
        this._store = backup
        throw new RemoteError('invalid sync')
      }
    }
  }

  async getRemoteDataVersion () {
    const url = new URL(RpdbClient.endpoints.VERS, this.url)
    const { response } = RpdbClient.assertDefinitionVersion(
      await this.request({
        method: 'GET',
        url: url.toString(),
        responseType: 'json'
      })
    )
    if (typeof response.data_vers !== 'number') {
      throw new RemoteError('expect remote db version to be a number')
    }
    return response.data_vers
  }

  async syncRemoteData () {
    const url = new URL(RpdbClient.endpoints.SYNC, this.url)
    const data = JSON.stringify({
      v: this.dataVersion
    })
    const response = RpdbClient.assertDefinitionVersion(
      await this.request({
        method: 'POST',
        url: url.toString(),
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        },
        responseType: 'json',
        data
      })
    )
    if (!Array.isArray(response.update)) {
      throw new RemoteError('expect remote update to be an array')
    }
    this._store = this._store.concat(response.update)
  }

  load () {
    const store = this.getValue(this.storageKey, { })
    this._dbVers = typeof store.v === 'number' ? store.v : 0
    this._store = Array.isArray(store.d) ? store.d : []
  }

  save () {
    this.setValue(this.storageKey, {
      v: this._dbVers,
      d: this._store
    })
  }

  clear () {
    this.deleteValue(this.storageKey)
  }

  get ready () {
    return this._dbVers >= 0
  }

  get dataVersion () {
    return this._db.map(r => r._)
      .reduce((x, y) => Math.max(x, y), -1)
  }

  get storageKey () {
    return `${RpdbClient.STORAGE_PREFIX}_${this.url}`
  }

  static assertStorage (store) {
    if (typeof store !== 'object') {
      throw new StorageError('invalid storage data')
    }
    if (typeof store.v !== 'number' || !Array.isArray(store.d)) {
      throw new StorageError('corrupted storage data')
    }
    if (store.v !== RpdbClient.STORAGE_VERS) {
      throw new VersionError('mismatched storage version')
    }
    return store
  }

  static fixStorage (store) {

  }

  static assertResponse ({ response }) {
    if (typeof response !== 'object') {
      throw new RemoteError('invalid response')
    }
    const errorCode = response.error_code
    const errorMessage = response.error_message
    if (typeof errorCode !== 'number' || typeof errorMessage !== 'string') {
      throw new RemoteError('corrupted response')
    }
    if (errorCode !== 0) {
      throw new RemoteFailed(errorCode, errorMessage)
    }
    return { response }
  }

  static assertDefinitionVersion ({ response }) {
    if (typeof response.def_vers !== 'number') {
      throw new RemoteError('expect remote db version to be a number')
    }
    if (response.def_vers !== RpdbClient.DEF_VERS) {
      throw new VersionError('mismatched definition version')
    }
    return { response }
  }

  /**
   * Use this class method to get a rpdb client per url,
   * in order to avoid race condition on storage spaces
   * @param {URL|string} url
   */
  static get (url) {
    const urlObj = typeof url === 'string' ? new URL(url) : url
    const urlStr = urlObj.toString()
    if (!this.instances[urlStr]) {
      this.instances[urlStr] = new RpdbClient(urlObj)
    }
    return this.instances[urlStr]
  }
}

export class ExpRpdbClient extends RpdbClient {
  findByContent (content) {

  }
}

export class ExpReportDef {
  static EVENT_NSP = 5
  static EVENT_FILTER = Math.pow(2, ExpReportDef.EVENT_NSP) - 1
  static SUB_EVENT_NSP = 3
  static SUB_EVENT_FILTER = Math.pow(2, ExpReportDef.SUB_EVENT_NSP) - 1

  constructor (store) {
    /**
     * @typedef {Object} ExpReportStore
     * @property {string} t report body template
     * @property {number} n 8-bit type vector,
     * the first 5-bit is the event type enum,
     * and the last 3-bit is the sub-type enum according to the event.
     * e.g. if the event type is PROFIT(1) then the sub-type means the profit type.
     *//**
     * @type {ExpReportStore}
     */
    this._store = store
  }

  get template () {
    return this._store.t
  }

  get eventType () {
    return (this._store.n >> ExpReportDef.SUB_EVENT_NSP) & ExpReportDef.EVENT_FILTER
  }

  get subEventType () {
    return this._store.n & ExpReportDef.SUB_EVENT_FILTER
  }

  get id () {
    return this._store._
  }
}
