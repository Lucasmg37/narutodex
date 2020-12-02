const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('../api/routes/routes.js')

module.exports = () => {
  const app = express()

  app.set('port', process.env.PORT || 3333)

  app.use(bodyParser.json())
  app.use(cors())
  app.use('/assets', express.static('./assets'))
  app.use(routes)

  return app
}
