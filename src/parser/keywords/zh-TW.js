export const Resource = {
  metal: '金屬',
  crystal: '晶體',
  deuterium: '重氫',
  darkmatter: '暗物質'
}

export const Ship = {
  smallcargo: '小型運輸艦',
  largecargo: '大型運輸艦',
  lightfighter: '輕型戰鬥機',
  heavyfighter: '重型戰鬥機',
  cruiser: '巡洋艦',
  battleship: '戰列艦',
  espionageprobe: '間諜衛星',
  battlecruiser: '戰鬥巡洋艦',
  bomber: '導彈艦',
  destroyer: '毀滅者',
  reaper: '惡魔飛船',
  pathfinder: '探路者'
}

export const ItemLevel = {
  gold: '黃金級',
  silver: '白銀級',
  bronze: '紅銅級'
}

export const ItemType = {
  metalbooster: '金屬增補器',
  crystalbooster: '晶體增補器',
  deuteriumbooster: '重氫濃縮器',
  kraken: '海怪建築機器人',
  newtron: '中子科研機器人',
  detroid: '底特律船塢機器人'
}

export const patterns = [
  {
    event: 'rsrcprofit',
    test: [
      /捕獲了 [^\s]+ [\d,.]+ \./
    ],
    reduce: /^捕獲了 ([^\s]+) ([\d,.]+) \.$/gm
  },
  {
    event: 'shipprofit',
    test: [
      /下列艦船隸屬於艦隊:/
    ],
    reduce: /^([^:]+): (\d+)$/gm
  },
  {
    event: 'fleetsacrif',
    test: [
      /與遠征探險艦隊的聯繫突然間中斷了\.我們的科學家們還在努力嘗試重新建立聯繫,不過似乎艦隊已經永遠消失了\./,
      /我們從遠征探險艦隊收到了最後傳來的影像,那是一個大得嚇人的黑洞\./,
      /遠征探險隊傳來的最後一條無線電訊息:滋~~~~ 糟了！咖~~~~ 那邊 滋~~~ 好像 嗶~~~有…\n+訊息中斷/
    ]
  }
]
