const path = require('path')
const WebpackUserscript = require('webpack-userscript')

const WEBPACK_DEV_SERVER = process.env.WEBPACK_DEV_SERVER === 'true'
const DEV_MODE = WEBPACK_DEV_SERVER || process.env.NODE_ENV === 'development'

const SRC_PATH = path.resolve(__dirname, 'src')
const DIST_PATH = path.resolve(__dirname, DEV_MODE ? '.dev/dist' : 'dist')
const USERSCRIPT_RC_PATH = path.resolve(__dirname, 'userscriptrc.js')

const COMMON_CONFIG = {
  target: 'web',
  entry: './src/index.ts',
  output: { path: DIST_PATH },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': SRC_PATH
    }
  },
  plugins: [
    new WebpackUserscript({
      headers: USERSCRIPT_RC_PATH
    })
  ]
}

const DEV_CONFIG = Object.assign({}, COMMON_CONFIG, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    ...COMMON_CONFIG.output,
    filename: 'ogdk-dev.user.js'
  },
  devServer: {
    hot: false,
    liveReload: false,
    inline: false
  }
})

const PROD_CONFIG = Object.assign({}, COMMON_CONFIG, {
  mode: 'production',
  output: {
    ...COMMON_CONFIG.output,
    filename: 'ogdk.user.js'
  }
})

if (DEV_MODE) {
  module.exports = DEV_CONFIG
} else {
  module.exports = [DEV_CONFIG, PROD_CONFIG]
}

console.log('webpack.config.js', module.exports)
