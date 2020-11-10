const express = require('express')

const fandomCharacterController = require('../controllers/fandom/character')
const fandomCharacterDescriptionController = require('../controllers/fandom/characterDescription')
const fandomCharacterJutsuController = require('../controllers/fandom/characterJutsus')
const fandomJutsuController = require('../controllers/fandom/jutsuData')

const proccessDataHandstampController = require('../controllers/processData/jutsu')

const jutsuController = require('../controllers/jutsu')

const routes = express.Router()
routes.get('/api/v1/fandom/character', fandomCharacterController)
routes.get('/api/v1/fandom/character/description', fandomCharacterDescriptionController)
routes.get('/api/v1/fandom/character/jutsus', fandomCharacterJutsuController)
routes.get('/api/v1/fandom/jutsu', fandomJutsuController)

routes.get('/api/v1/process/jutsu/handstamp', proccessDataHandstampController.processHandstamp)
routes.get('/api/v1/process/jutsu/classification', proccessDataHandstampController.processClassification)
routes.get('/api/v1/process/jutsu/class', proccessDataHandstampController.processClass)

routes.get('/api/v1/jutsu', jutsuController.index)

module.exports = routes
