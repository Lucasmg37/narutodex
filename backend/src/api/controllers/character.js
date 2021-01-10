const { Character, Jutsu } = require('../../models')
const fs = require('fs')
const fetch = require('node-fetch')

module.exports = {
  index: async (req, res) => {
    try {
      const characters = await Character.findAll({
        order: [
          ['name', 'ASC']
        ],
        include: [
          {
            model: Jutsu,
            as: 'jutsus'
          }
        ]
      })

      res.send({
        status: true,
        message: 'Personagens retornados com sucesso.',
        data: characters
      }).status(200)
    } catch (err) {
      console.error(err)
      res.send({
        status: true,
        message: 'Erro!',
        data: {}
      }).status(500)
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params

      const character = await Character.findOne({
        where: { id },
        include: [
          {
            model: Jutsu,
            as: 'jutsus'
          }
        ]
      })

      res.send({
        status: true,
        message: 'Personagem retornado com sucesso.',
        data: character
      }).status(200)
    } catch (err) {
      console.error(err)
      res.send({
        status: true,
        message: 'Erro!',
        data: {}
      }).status(500)
    }
  },

  image: async (req, res) => {
    const { id } = req.params

    const imagePath = './public/images/characters/' + id + '.jpg'

    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath, { root: './' })
      return
    }

    try {
      const character = await Character.findOne({ where: { id } })

      if (!character) {
        return
      }

      const response = await fetch(character.image_fandom)
      const buffer = await response.buffer()
      fs.writeFile(imagePath, buffer, () => {
        res.sendFile(imagePath, { root: './' })
      })
    } catch (err) {
      console.error(err)
      res.send({
        status: true,
        message: 'Erro!',
        data: {}
      }).status(500)
    }
  }
}
