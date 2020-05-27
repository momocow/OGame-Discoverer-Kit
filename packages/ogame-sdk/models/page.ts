// import { Numeral, ExternalValue } from '@/utils'
import { expect } from '@/utils/expect'

export class PageError extends Error {
  public readonly name: string = 'PageError'

  constructor (public original: Error) {
    super(original.message)
    this.stack = original.stack
  }
}

export class Page {
  protected static _try<T> (cb: (...args: any[]) => T): T {
    try {
      return cb()
    } catch (e) {
      throw new PageError(e)
    }
  }

  public static get url (): URL {
    return this._try(() => new URL(location.href))
  }

  constructor (
    public readonly url: URL = Page.url
  ) { }
}

export type ServerSlug = [number, string]

export const serverId: ExternalValue<number> = new ExternalValue(
  function serverId () { return serverSlug.get()[0] }
)

export const region: ExternalValue<string> = new ExternalValue(
  function region () { return serverSlug.get()[1] }
)

export const metals = new ExternalValue<Numeral>(
  function metals () {
    return Numeral.parse($('#resources_metal').text())
  }
)

export const crystals = new ExternalValue<Numeral>(
  function crystals () {
    return Numeral.parse($('#resources_crystal').text())
  }
)

export const deteriums = new ExternalValue<Numeral>(
  function deteriums () {
    return Numeral.parse($('#resources_deuterium').text())
  }
)

export class GamePage extends Page {
  // public static serverSlug: ExternalValue<ServerSlug> = new ExternalValue(
  //   function serverSlug () {
  //     const urlobj = Page.url.get()
  //     const serverMatched = urlobj.hostname.match(/s(\d+)-([a-z]+)/)
  //     if (serverMatched === null || serverMatched.length < 3) {
  //       throw new Error('failed to extract universe info from hostname')
  //     }
  //     return [parseInt(serverMatched[1]), serverMatched[2]]
  //   }
  // )
}


export interface __Player {
  playerId: number
  name: string
  hasCommander: boolean
  hasAPassword: boolean
}

declare global {
  const serverTime: Date
  const player: __Player
}

// Variables starts with "__" indicate global variables from OGame

export const __serverTime: ExternalValue<Date> = new ExternalValue(
  function __serverTime () { return serverTime }
)

export const __player: ExternalValue<__Player> = new ExternalValue(
  function __player () { return player }
)
