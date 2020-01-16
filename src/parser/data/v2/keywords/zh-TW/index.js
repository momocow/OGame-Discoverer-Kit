import { bimap } from '@/utils/bimap'

export const resource = bimap({
  Metal: '金屬',
  Crystal: '晶體',
  Deuterium: '重氫',
  DarkMatter: '暗物質'
})

export const ship = bimap({
  SmallCargo: '小型運輸艦',
  LargeCargo: '大型運輸艦',
  LightFighter: '輕型戰鬥機',
  HeavyFighter: '重型戰鬥機',
  Cruiser: '巡洋艦',
  BattleShip: '戰列艦',
  EspionageProbe: '間諜衛星',
  BattleCruiser: '戰鬥巡洋艦',
  Bomber: '導彈艦',
  Destroyer: '毀滅者',
  Reaper: '惡魔飛船',
  PathFinder: '探路者'
})

export const item = bimap({
  GoldMetalBooster: '黃金級金屬增補器',
  GoldCrystalbooster: '黃金級晶體增補器',
  GoldDeuteriumBooster: '黃金級重氫濃縮器',
  GoldKraken: '黃金級海怪建築機器人',
  GoldNewtron: '黃金級中子科研機器人',
  GoldDetroid: '黃金級底特律船塢機器人',
  SilverMetalBooster: '白銀級金屬增補器',
  SilverCrystalbooster: '白銀級晶體增補器',
  SilverDeuteriumBooster: '白銀級重氫濃縮器',
  SilverKraken: '白銀級海怪建築機器人',
  SilverNewtron: '白銀級中子科研機器人',
  SilverDetroid: '白銀級底特律船塢機器人',
  BronzeMetalBooster: '紅銅級金屬增補器',
  BronzeCrystalbooster: '紅銅級晶體增補器',
  BronzeDeuteriumBooster: '紅銅級重氫濃縮器',
  BronzeKraken: '紅銅級海怪建築機器人',
  BronzeNewtron: '紅銅級中子科研機器人',
  BronzeDetroid: '紅銅級底特律船塢機器人'
})

export { default as patterns } from './patterns'
