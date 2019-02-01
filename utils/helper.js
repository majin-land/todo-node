const crypto = require('crypto')

module.exports.isNumber = string => string.match(/^\d+$/) !== null

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
module.exports.validEmail = email => emailRegex.test(String(email).toLowerCase())

module.exports.randomString = (length = 8) => crypto.randomBytes(length).toString('hex')

module.exports.parseNumber = (number = 0) => {
  const num = Number(number)
  if (Number.isNaN(num)) return 0
  return num
}

module.exports.parseBoolean = (value) => {
  return (value.toLowerCase() === 'true')
}
