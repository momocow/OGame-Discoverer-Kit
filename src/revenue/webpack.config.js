const OGDK_DEV = process.env.OGDK_DEV =
  typeof process.env.NODE_ENV !== 'undefined'
    ? process.env.NODE_ENV === 'development'
    : process.env.WEBPACK_DEV_SERVER === 'true'

const path = require('path')
const WebpackUserscript = require('webpack-userscript')

module.exports = {
  mode: OGDK_DEV ? 'development' : 'production',
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.resolve('dist'),
    filename: OGDK_DEV ? 'ogdk-revenue.dev.js' : 'ogdk-revenue.js'
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
    })
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}
