const mask = (params) => {
  if (params && params.password) {
    return JSON.stringify(Object.assign({}, params, { password: params.password.replace(/./g, '*') }))
  }

  return JSON.stringify(params)
}

module.exports.logWithMask = (req, message) => {
  console.error('CAUGHT ERROR:', message, req.method, req.originalUrl, mask(req.body))
}
