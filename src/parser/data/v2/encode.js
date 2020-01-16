import { bimap } from '@/utils/bimap'

export const resource = bimap({
  Metal: 1,
  Crystal: 2,
  Deuterium: 3,
  DarkMatter: 4
})

export const ship = {
  SmallCargo: 202,
  LargeCargo: 203,
  LightFighter: 204,
  HeavyFighter: 205,
  Cruiser: 206,
  BattleShip: 207,
  EspionageProbe: 210,
  Bomber: 211,
  Destroyer: 213,
  BattleCruiser: 215,
  Reaper: 218,
  PathFinder: 219
}

export const reportType = bimap({
  Expedition: 1
})

export const item = bimap({
  GoldMetalBooster: 1,
  GoldCrystalbooster: 2,
  GoldDeuteriumBooster: 3,
  GoldKraken: 4,
  GoldNewtron: 5,
  GoldDetroid: 6,
  SilverMetalBooster: 7,
  SilverCrystalbooster: 8,
  SilverDeuteriumBooster: 9,
  SilverKraken: 10,
  SilverNewtron: 11,
  SilverDetroid: 12,
  BronzeMetalBooster: 13,
  BronzeCrystalbooster: 14,
  BronzeDeuteriumBooster: 15,
  BronzeKraken: 16,
  BronzeNewtron: 17,
  BronzeDetroid: 18
})

export const event = bimap({
  Boring: 1,
  Resource: 2,
  Ship: 3,
  Item: 4,
  Accelerate: 5,
  Delay: 6,
  Sacrifice: 7,
  Trader: 8,
  Battle: 9
})
