const express = require('express')

const fandomCharacterController = require('../controllers/fandom/character')
const fandomCharacterDescriptionController = require('../controllers/fandom/characterDescription')
const fandomCharacterJutsuController = require('../controllers/fandom/characterJutsus')
const fandomJutsuController = require('../controllers/fandom/jutsuData')

const proccessDataHandstampController = require('../controllers/processData/jutsu')

const jutsuController = require('../controllers/jutsu')
const characterController = require('../controllers/character')
const searchController = require('../controllers/search')
const testController = require('../controllers/test')

const apiVersion = '/api/v1/'

const routes = express.Router()
routes.get(apiVersion + 'fandom/character', fandomCharacterController)
routes.get(apiVersion + 'fandom/character/description', fandomCharacterDescriptionController)
routes.get(apiVersion + 'fandom/character/jutsus', fandomCharacterJutsuController)
routes.get(apiVersion + 'fandom/jutsu', fandomJutsuController)

routes.get(apiVersion + 'process/jutsu/classification', proccessDataHandstampController.processClassification)
routes.get(apiVersion + 'process/jutsu/class', proccessDataHandstampController.processClass)
routes.get(apiVersion + 'process/jutsu/elements', proccessDataHandstampController.processElement)

routes.get(apiVersion + 'jutsu', jutsuController.index)
routes.get(apiVersion + 'jutsu/random', jutsuController.getRandom)
routes.get(apiVersion + 'jutsu/:id', jutsuController.getOne)
routes.get(apiVersion + 'search', searchController.index)
routes.get(apiVersion + 'jutsu/:id/image', jutsuController.image)

routes.get(apiVersion + 'character/random', characterController.getRandom)
routes.get(apiVersion + 'character/:id/image', characterController.image)
routes.get(apiVersion + 'character/:id', characterController.getOne)
routes.get(apiVersion + 'character', characterController.index)

routes.get('/test', testController.index)

module.exports = routes
