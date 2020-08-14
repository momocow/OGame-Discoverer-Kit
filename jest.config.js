const path = require('path')
const globals = require('./build/globals')

module.exports = {
  globals,
  setupFilesAfterEnv: [ path.join(__dirname, 'jest.setup.js') ]
}
