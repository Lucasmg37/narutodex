const express = require('express')
const bodyParser = require('body-parser')
const routes = require('../api/routes/routes.js')

module.exports = () => {
  const app = express()

  app.set('port', process.env.PORT || 3333)

  app.use(bodyParser.json())

  app.use(routes)

  return app
}
