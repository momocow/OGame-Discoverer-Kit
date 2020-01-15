import { bimap } from './utils'

export const Resource = bimap({
  undefined: 0,
  metal: 1,
  crystal: 2,
  deuterium: 3,
  darkmatter: 4
})

export const Ship = {
  smallcargo: 202,
  largecargo: 203,
  lightfighter: 204,
  heavyfighter: 205,
  cruiser: 206,
  battleship: 207,
  espionageprobe: 210,
  bomber: 211,
  destroyer: 213,
  battlecruiser: 215,
  reaper: 218,
  pathfinder: 219
}

export const ReportType = bimap({
  undefined: 0,
  expedition: 1
})

export const ItemLevel = bimap({
  undefined: 0,
  gold: 1,
  silver: 2,
  bronze: 3
})

export const ItemType = bimap({
  undefined: 0,
  metalbooster: 1,
  crystalbooster: 2,
  deuteriumbooster: 3,
  kraken: 4,
  newtron: 5,
  detroid: 6
})

export const EventType = bimap({
  undefined: 0,
  boring: 1,
  rsrcprofit: 2,
  shipprofit: 3,
  itemprofit: 4,
  flightaccel: 5,
  flightdelay: 6,
  fleetsacrif: 7,
  traderfound: 8
})
