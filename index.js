const express = require('express')
require('express-async-errors')
const compression = require('compression')
const noCache = require('nocache')
const requireDir = require('require-dir')
const bodyParser = require('body-parser')
const cors = require('cors')
const frameguard = require('frameguard')
const requestIp = require('request-ip')
const useragent = require('express-useragent')

const Config = require('./config')

const exception = require('./utils/exception')
const logs = require('./utils/logs')

const routes = requireDir('./controllers', { recurse: true })

const app = express()

// get PORT from .env file info
const port = process.env.PORT || '3020' // default to 3020 if port info not set

app.disable('x-powered-by')
app.use(cors())
app.use(frameguard())
app.use(noCache())
app.use(requestIp.mw())
app.use(useragent.express())
app.use(bodyParser.json({ limit: '10mb' })) // for parsing application/json
app.use(compression())

app.get('/', (req, res) => {
  res.json({
    meta: {
      code: 200,
      error: null,
      message: `Server is running at: http://localhost:${port}`,
    },
  })
})

app.use('/todo', routes.todo)

app.use((err, req, res, next) => {
  if (err) {
    const [error, status] = exception(err)

    logs.logWithMask(req, error.message)

    if (status === 500) {
      res.status(status).json({
        meta: {
          code: 500,
          message: Config.env.PRODUCTION ? 'Please contact admin' : error.message,
        },
      })
    } else {
      res.status(status).json({ meta: error })
    }
    return
  }
  next()
})

app.use((req, res) => {
  if (!res.headersSent) {
    res.status(404).json({ message: 'Sorry can\'t find that!' })
  }
})

app.listen(port, () => console.log(`Server listening http on ${port}`))
