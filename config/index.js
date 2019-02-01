// set default env if not provided
require('dotenv').config()

const ENV = process.env.NODE_ENV || 'development'
const Config = require('./config')

module.exports = {
  dbConfig: Config[ENV],
  DEFAULT: {
    COUNTRY: 'ID', // use in google map
    CURRENCY: 'IDR',
    TIMEZONE: 'Asia/Jakarta',
  },
  env: {
    PRODUCTION: ENV === 'production',
    DEVELOPMENT: ENV === 'development',
    TEST: ENV === 'test',
  },
}
