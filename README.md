# OGame Discoverer Kit

## 功能/特性
- 遠征資源收益統計
- 遠征艦隊收益統計
- 按時間區間查詢收益結果

## 環境依賴
- [TamperMonkey](https://www.tampermonkey.net/)

## 安裝
[立即安裝 🔧](https://cow.moe/OGame-Discoverer-Kit/dist/ogdk.user.js)

## 更新日誌
[閱讀更多 ➡️](./changelog/)

## 開發
- `npm run dev`
  啟動測試伺服器 (`webpack-dev-server`)。

  可於瀏覽器開啟以下連結取得即時構建的腳本，`wds_port` 為 `webpack-dev-server` 所監聽的埠，
  `publicPath` 為 `output.publicPath` 或 `devServer.publicPath` 的設定值。
  - `http://localhost:<wds_port>/<publicPath>/ogdk.user.js`
  - `http://localhost:<wds_port>/<publicPath>/ogdk.meta.js`
  - `http://localhost:<wds_port>/<publicPath>/ogdk-dev.user.js`
  - `http://localhost:<wds_port>/<publicPath>/ogdk-dev.meta.js`

- `npm run build`
  構建腳本，輸出目錄依據環境變數 `NODE_ENV` 決定。

  - 當 `NODE_ENV` 為 `development`，輸出目錄為 `.dev/dist/`。
  - 否則輸出目錄為 `dist/`。
  
  輸出目錄下會構建出四個檔案。
  - `ogdk.user.js`
  - `ogdk.meta.js`
  - `ogdk-dev.user.js`
  - `ogdk-dev.meta.js`

- `npm run lint`
  語法檢查。
- `npm run lint:fix`
  語法檢查與自動修復。

- `npm run eject`
  淨空 `.dev/`。

- `npm run commit`
  呼叫 `gitmoji` 命令行。
