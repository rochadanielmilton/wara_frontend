const fs = require('fs')
const path = require('path')
const DEV_FILE = path.resolve('./config/dev.env.js')
const PROD_FILE = path.resolve('./config/prod.env.js')
const DEV_FILE_DEFAULT = path.resolve('./config/dev.env.js.sample')
const PROD_FILE_DEFAULT = path.resolve('./config/prod.env.js.sample')
const DEVELOPMENT = 'development'
const PRODUCTION = 'production'
let config = {}

module.exports = () => {
  try {
    if (process.env.NODE_ENV === DEVELOPMENT) {
      if (fs.existsSync(DEV_FILE)) {
        config = require(DEV_FILE)
      } else if (fs.existsSync(DEV_FILE_DEFAULT)) {
        config = require(DEV_FILE_DEFAULT)
      }
    }
    if (process.env.NODE_ENV === PRODUCTION) {
      if (fs.existsSync(PROD_FILE)) {
        config = require(PROD_FILE)
      } else if (fs.existsSync(PROD_FILE_DEFAULT)) {
        config = require(PROD_FILE_DEFAULT)
      }
    }
    return config
  } catch (error) {
    return {}
  }
}
