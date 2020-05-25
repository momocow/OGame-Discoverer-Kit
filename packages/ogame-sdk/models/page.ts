import { $serverTime } from '../globals'
import { Numeral, ExternalValue } from '../utils'
import { Model } from './base'

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
  public static serverSlug = new ExternalValue<[string, string]>(
    (url: URL) => {
      const serverMatched = url.hostname.match(/(s\d+)-([a-z]+)/)
      if (serverMatched === null || serverMatched.length < 3) {
        throw new Error('failed to extract server from hostname')
      }
      const [, server, country] = serverMatched
      return [server, country]
    },
    'url.serverSlug'
  )

  public static metals = new ExternalValue<Numeral>(
    () => Numeral.parse($('#resources_metal').text()),
    'dom.metals'
  )

  public static crystals = new ExternalValue<Numeral>(
    () => Numeral.parse($('#resources_crystal').text()),
    'dom.crystals'
  )

  public static deteriums = new ExternalValue<Numeral>(
    () => Numeral.parse($('#resources_deuterium').text()),
    'dom.deteriums'
  )

  constructor () {
    super()
    const [server, country] = GamePage.serverSlug.get(undefined, this.url)
    this._data.server = server
    this._data.country = country
  }

  public get server (): string {
    return this._data.server
  }

  public get country (): string {
    return this._data.country
  }

  public get serverTime (): Date {
    return $serverTime.get()
  }

  public get metals (): Numeral {
    return GamePage.metals.get()
  }

  public get crystals (): Numeral {
    return GamePage.crystals.get()
  }

  public get deteriums (): Numeral {
    return GamePage.deteriums.get()
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
