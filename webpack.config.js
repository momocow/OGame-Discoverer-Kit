const path = require('path')
const WebpackUserscript = require('webpack-userscript')

const WEBPACK_DEV_SERVER = process.env.WEBPACK_DEV_SERVER === 'true'
const DEV_MODE = WEBPACK_DEV_SERVER || process.env.NODE_ENV === 'development'

const SRC_PATH = path.resolve(__dirname, 'src')
const DIST_PATH = path.resolve(__dirname, DEV_MODE ? '.dev/dist' : 'dist')
const USERSCRIPT_RC_PATH = path.resolve(__dirname, 'userscriptrc.js')

module.exports = {
  entry: './src/index.ts',
  mode: DEV_MODE ? 'development' : 'production',
  devtool: DEV_MODE ? 'inline-source-map' : undefined,
  output: {
    path: DIST_PATH,
    filename: 'ogame-discoverer-kit.user.js'
  },
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

console.log('webpack.config.js', module.exports)
