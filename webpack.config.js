const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackUserscript = require('webpack-userscript')

const DEV = process.env.WEBPACK_DEV_SERVER === 'true'

module.exports = {
  mode: DEV ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ogek.user.js'
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
