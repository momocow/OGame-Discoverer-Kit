import { Model } from './base'
import { ModelError } from './errors'

export class Page extends Model {
  constructor () {
    super()
    this._data.url = new URL(location.href)
  }

  public get url (): URL {
    return this._data.url
  }
}

export class GamePage extends Page {
  constructor () {
    super()

    const serverMatched = this.url.hostname.match(/(s\d+)-([a-z]+)/)
    if (serverMatched === null) {
      throw new ModelError('failed to extract server from hostname')
    }
    this._data.server = serverMatched[0]
    this._data.universe = serverMatched[1]
    this._data.country = serverMatched[2]
  }

  public get server (): string {
    return this._data.server
  }

  public get universe (): string {
    return this._data.universe
  }

  public get country (): string {
    return this._data.country
  }

  public get metals (): int {
  }

  public get crystals (): int {
  }

  public get deteriums (): int {
  }

  public toJSON (): Record<string, any> {
    return {
      ...super.toJSON(),
      metals: this.metals,
      crystals: this.crystals,
      deteriums: this.deteriums
    }
  }
}
