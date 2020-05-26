import { Numeral, ExternalValue } from '@/utils'
import { serverSlug } from '@/values'
import { Model } from './base'

export class Page extends Model {
  // public static url: ExternalValue<URL> = new ExternalValue(
  //   function url () { return new URL(location.href) }
  // )

  public get url (): URL {
    return new URL(location.href)
  }

  // constructor () {
  //   super()
  //   this._data.url = new URL(location.href)
  // }
}

// export class GamePage extends Page {
//   constructor () {
//     super()
//     this._data.server = server
//     this._data.country = country
//   }

//   public get server (): string {
//     return this._data.server
//   }

//   public get country (): string {
//     return this._data.country
//   }

//   public get serverTime (): Date {
//     return $serverTime.get()
//   }

//   public get metals (): Numeral {
//     return GamePage.metals.get()
//   }

//   public get crystals (): Numeral {
//     return GamePage.crystals.get()
//   }

//   public get deteriums (): Numeral {
//     return GamePage.deteriums.get()
//   }

//   public toJSON (): Record<string, any> {
//     return {
//       ...super.toJSON(),
//       metals: this.metals,
//       crystals: this.crystals,
//       deteriums: this.deteriums
//     }
//   }
// }
