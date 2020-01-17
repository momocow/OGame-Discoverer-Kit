const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackUserscript = require('webpack-userscript')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const DEV = process.env.WEBPACK_DEV_SERVER === 'true'
const UI_DEV = !!process.env.UI_DEV

const COMMON_CONFIG = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
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
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}

const UI_DEV_CONFIG = {
  ...COMMON_CONFIG,
  mode: 'development',
  entry: path.resolve(__dirname, 'dev', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dev'),
    filename: 'dev.[hash].js'
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'dev', 'index.html')
    })
  ]
}

module.exports = [
  {
    ...COMMON_CONFIG,
    mode: DEV ? 'development' : 'production',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'ogame-discoverer-kit.user.js'
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
      inline: false,
      stats: {
        warningsFilter: [
          /Module not found: Error: Can't resolve 'weekstart(?:\/package\.json)?'/
        ]
      }
    },
    stats: {
      warningsFilter: [
        /Module not found: Error: Can't resolve 'weekstart(?:\/package\.json)?'/
      ]
    }
  }
]

if (UI_DEV) {
  module.exports.push(UI_DEV_CONFIG)
}
