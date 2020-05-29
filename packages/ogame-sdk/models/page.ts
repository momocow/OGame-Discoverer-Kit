import { Numeral } from '@/utils/numeral'
import { $$, $parseInt } from '@/utils/strict'

import { SemVer } from 'semver'

declare global {
  const serverTime: Date
}

export class Page {
  public url: URL = new URL(location.href)
}

export class GamePage extends Page {
  public readonly session: string
  public readonly version: SemVer
  public readonly timestamp: number
  public readonly universe: string
  public readonly server: string
  public readonly region: string
  public readonly language: string
  public readonly universeName: string
  public readonly universeSpeed: number
  public readonly universeSpeedFleet: number
  public readonly isDonutGalaxy: boolean
  public readonly isDonutSystem: boolean
  public readonly playerId: string
  public readonly playerName: string
  public readonly planetId: string
  public readonly planetName: string



  constructor () {
    super()

    this.session = this._getMeta('ogame-session')
    this.version = new SemVer(this._getMeta('ogame-version'))
    this.timestamp = $parseInt(this._getMeta('ogame-timestamp'))*1000
    
    const m = this._getMeta('ogame-universe').match(/^(s\d+)-([a-z]+)/)
    if (m === null || m.length < 3) {
      throw new Error('invalid universe')
    }
    [this.universe, this.server, this.region] = m

    this.universeName = this._getMeta('ogame-universe-name')

  }

  public getMetals (): Numeral {
    return Numeral.parse($$('#resources_metal').text())
  }

  public getCrystals (): Numeral {
    return Numeral.parse($$('#resources_crystal').text())
  }

  public getDeteriums (): Numeral {
    return Numeral.parse($$('#resources_deuterium').text())
  }

  public getServerTime (): Date {
    if (!(serverTime instanceof Date)) {
      throw new Error('serverTime is not a Date')
    }
    return serverTime
  }

  private _getMeta (name: string): string {
    const value = $$(`meta[name=${name}]`).prop('content')
    if (typeof value !== 'string') {
      throw new Error(`failed to read mata[name=${name}]`)
    }
    return value
  }
}

<meta name="ogame-universe-speed" content="4">
<meta name="ogame-universe-speed-fleet" content="2">
<meta name="ogame-language" content="tw">
<meta name="ogame-donut-galaxy" content="1">
<meta name="ogame-donut-system" content="1">
<meta name="ogame-player-id" content="105541">
<meta name="ogame-player-name" content="Destiny">
<meta name="ogame-planet-id" content="33696423">
<meta name="ogame-planet-name" content="42 35 38">
<meta name="ogame-planet-coordinates" content="6:250:7">
<meta name="ogame-planet-type" content="planet">

<meta name="ogame-alliance-id" content="500004">
<meta name="ogame-alliance-name" content="Super NewBee">
<meta name="ogame-alliance-tag" content="NewB">