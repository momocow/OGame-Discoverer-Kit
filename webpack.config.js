const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackUserscript = require('webpack-userscript')

const DEV = process.env.WEBPACK_DEV_SERVER === 'true'

module.exports = {
  mode: DEV ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ogame-discoverer-kit.user.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackUserscript({
      headers: path.resolve(__dirname, 'userscriptrc.js')
    })
  ],
  devServer: {
    hot: false,
    liveReload: false,
    inline: false
  }
}
