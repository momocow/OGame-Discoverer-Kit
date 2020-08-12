const OGDK_DEV = process.env.OGDK_DEV =
  typeof process.env.NODE_ENV !== 'undefined'
    ? process.env.NODE_ENV === 'development'
    : process.env.WEBPACK_DEV_SERVER === 'true'

const path = require('path')
const WebpackUserscript = require('webpack-userscript')
const DefinePlugin = require('webpack/lib/DefinePlugin')

global.ROOT_DIR = global.ROOT_DIR ?? path.resolve(__dirname)
global.CORE_PKG_JSON = require('./package.json')

module.exports = {
  mode: OGDK_DEV ? 'development' : 'production',
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(global.ROOT_DIR, 'dist'),
    filename: OGDK_DEV ? 'ogdk-core.dev.js' : 'ogdk-core.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            extends: path.join(__dirname, '.babelrc')
          }
        }
      }
    ]
  },
  plugins: [
    new WebpackUserscript({
      headers: path.join(__dirname, 'userscript.js')
    }),
    new DefinePlugin({
      OGDK_CORE_NAME: global.CORE_PKG_JSON.name
    })
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'emago': 'emago'
  }
}
