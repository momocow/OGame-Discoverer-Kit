import { Coordinate } from '@/models/coordinate'
import { Server } from '@/models/server'
import { $parseFloat, $parseInt } from '@/utils'
import { SemVer } from 'semver'
import '../_jquery'

declare global {
  const serverTime: Date
}

export function getMeta (name: string): string {
  const value = $(`meta[name=${name}]`).assertOne().prop('content')
  if (typeof value !== 'string') {
    throw new Error(`failed to read meta[name=${name}]`)
  }
  return value
}

export function getUrl (): URL {
  return new URL(location.href)
}

export function getServer (): Server {
  return Server.from(getMeta('ogame-universe'))
}

export function getSessionId (): string {
  return getMeta('ogame-session')
}

export function getVersion (): SemVer {
  return new SemVer(getMeta('ogame-version'))
}

export function getTimestamp (): number {
  return $parseInt(getMeta('ogame-timestamp')) * 1000
}

export function getUniverseName (): string {
  return getMeta('ogame-universe-name')
}

export function getLanguage (): string {
  return getMeta('ogame-language')
}

export function isDonutGalaxy (): boolean {
  return getMeta('ogame-donut-galaxy') === '1'
}

export function isDonutSystem (): boolean {
  return getMeta('ogame-donut-system') === '1'
}

export function getUniverseSpeed (): number {
  return $parseFloat(getMeta('ogame-universe-speed'))
}

export function getUniverseFleetSpeed (): number {
  return $parseFloat(getMeta('ogame-universe-speed-fleet'))
}

export function getPlayerId (): string {
  return getMeta('ogame-player-id')
}

export function getPlayerName (): string {
  return getMeta('ogame-player-name')
}

export function getPlanetId (): string {
  return getMeta('ogame-planet-id')
}

export function getPlanetName (): string {
  return getMeta('ogame-planet-name')
}

export function getPlanetCoordinate (): Coordinate {
  return Coordinate.from(getMeta('ogame-planet-coordinates'))
}

export type PlanetType = 'planet' | 'moon'

function isPlanetType (value: any): value is PlanetType {
  return typeof value === 'string' && ['planet', 'moon'].includes(value)
}

export function getPlanetType (): PlanetType {
  const planetType = getMeta('ogame-planet-type')
  if (!isPlanetType(planetType)) {
    throw new Error('invalid planet type')
  }
  return planetType
}

export function getAllianceId (): string {
  return getMeta('ogame-alliance-id')
}

export function getAllianceName (): string {
  return getMeta('ogame-alliance-name')
}

export function getAllianceTag (): string {
  return getMeta('ogame-alliance-tag')
}
