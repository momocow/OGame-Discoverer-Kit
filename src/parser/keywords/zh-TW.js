export const resource = {
  metal: '金屬',
  crystal: '晶體',
  deuterium: '重氫',
  darkmatter: '暗物質'
}

export const ship = {
  202: '小型運輸艦',
  203: '大型運輸艦',
  204: '輕型戰鬥機',
  205: '重型戰鬥機',
  206: '巡洋艦',
  207: '戰列艦',
  210: '間諜衛星',
  215: '戰鬥巡洋艦',
  211: '導彈艦',
  213: '毀滅者',
  218: '惡魔飛船',
  219: '探路者'
}

export const item = {
  level: {
    gold: '黃金級',
    silver: '白銀級',
    bronze: '紅銅級'
  },
  type: {
    metalBooster: '金屬增補器',
    crystalBooster: '晶體增補器',
    deuteriumBooster: '重氫濃縮器',
    kraken: '海怪建築機器人',
    newtron: '中子科研機器人',
    detroid: '底特律船塢機器人'
  }
}

export const patterns = [
  {
    event: 2,
    test: [
      /捕獲了 [^\s]+ [\d,.]+ \./
    ],
    reduce: /^捕獲了 ([^\s]+) ([\d,.]+) \.$/gm
  },
  {
    event: 3,
    test: [
      /下列艦船隸屬於艦隊:/
    ],
    reduce: /^([^:]+): (\d+)$/gm
  },
  {
    event: 7,
    test: [
      /與遠征探險艦隊的聯繫突然間中斷了\.我們的科學家們還在努力嘗試重新建立聯繫,不過似乎艦隊已經永遠消失了\./,
      /我們從遠征探險艦隊收到了最後傳來的影像,那是一個大得嚇人的黑洞\./,
      /遠征探險隊傳來的最後一條無線電訊息:滋~~~~ 糟了！咖~~~~ 那邊 滋~~~ 好像 嗶~~~有…\n+訊息中斷/
    ]
  }
]
