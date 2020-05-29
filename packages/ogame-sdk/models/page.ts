import { Numeral } from '@/utils/numeral'
import { $$, $parseInt, $parseFloat } from '@/utils/strict'

import { SemVer } from 'semver'

import { Coordinate } from './location'

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
  public readonly serverId: string
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
  public readonly planetCoordinates: Coordinate
  public readonly planetType: 'planet' | 'moon'
  public readonly allianceId: string
  public readonly allianceName: string
  public readonly allianceTag: string


  constructor () {
    super()

    this.session = this._getMeta('ogame-session')
    this.version = new SemVer(this._getMeta('ogame-version'))
    this.timestamp = $parseInt(this._getMeta('ogame-timestamp'))*1000
    
    const m = this._getMeta('ogame-universe').match(/^s(\d+)-([a-z]+)/)
    if (m === null || m.length < 3) {
      throw new Error('invalid universe')
    }
    [this.universe, this.serverId, this.region] = m

    this.universeName = this._getMeta('ogame-universe-name')
    this.language = this._getMeta('ogame-language')
    this.isDonutGalaxy = this._getMeta('ogame-donut-galaxy') === '1'
    this.isDonutSystem = this._getMeta('ogame-donut-system') === '1'
    this.universeSpeed = $parseFloat(this._getMeta('ogame-universe-speed'))
    this.universeSpeedFleet = $parseFloat(
      this._getMeta('ogame-universe-speed-fleet')
    )
    this.playerId = this._getMeta('ogame-player-id')
    this.playerName = this._getMeta('ogame-player-name')
    this.planetId = this._getMeta('ogame-planet-id')
    this.planetName = this._getMeta('ogame-planet-name')
    this.planetCoordinates = Coordinate.from(
      this._getMeta('ogame-planet-coordinates')
    )
    const planetType = this._getMeta('ogame-planet-type')
    if (!isPlanetType(planetType)) {
      throw new Error('invalid planet type')
    }
    this.planetType = planetType
    this.allianceId = this._getMeta('ogame-alliance-id')
    this.allianceName = this._getMeta('ogame-alliance-name')
    this.allianceTag = this._getMeta('ogame-alliance-tag')
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

function isPlanetType (value: any): value is 'planet' | 'moon' {
  return typeof value === 'string' && ['planet', 'moon'].includes(value)
}
