import { NotImplementedError } from '@/errors'

export class Storage {
  _store = {}

  get (paths, defval) {
    if (typeof paths === 'string') {
      return paths in this._store ? this._store[paths]
        : defval
    }

    if (Array.isArray(paths)) {
      let ptr = this._store
      for (const p of paths) {
        if (typeof ptr === 'object' && p in ptr) {
          ptr = ptr[p]
        } else if (arguments.length > 1) {
          return defval
        } else {
          throw new TypeError(`non-object has no key "${p}"`)
        }
      }
      return ptr
    }
  }

  async load () {
    this._store = await this._load()
  }

  async save () {
    await this._save(this._store)
  }

  _load () {
    throw new NotImplementedError('_load() is not implemented')
  }

  _save () {
    throw new NotImplementedError('_save() is not implemented')
  }
}
