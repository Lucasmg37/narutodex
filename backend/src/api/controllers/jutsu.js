const { Jutsu, GroupJutsusStamp, Stamp, Classification, Class, Element, Character, sequelize } = require('../../models')
const fs = require('fs')
const fetch = require('node-fetch')

module.exports = {
  index: async (req, res) => {
    try {
      const jutsus = await Jutsu.findAll({
        order: [
          ['name', 'ASC']
        ],
        include:
        [
          {
            model: GroupJutsusStamp,
            as: 'groupjutsusstamp',
            include: [{ model: Stamp, as: 'stamps' }]
          },
          {
            model: Character,
            as: 'characters'
          },
          {
            model: Classification,
            as: 'classifications'
          },
          {
            model: Class,
            as: 'classes'
          },
          {
            model: Element,
            as: 'elements'
          }
        ]
      })

      res.send({
        status: true,
        message: 'Jutsus retornados com sucesso.',
        data: jutsus
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

  getRandom: async (req, res) => {
    try {
      const jutsus = await Jutsu.findOne({
        order: sequelize.random(),
        include:
        [
          {
            model: GroupJutsusStamp,
            as: 'groupjutsusstamp',
            include: [{ model: Stamp, as: 'stamps' }]
          },
          {
            model: Character,
            as: 'characters'
          },
          {
            model: Classification,
            as: 'classifications'
          },
          {
            model: Class,
            as: 'classes'
          },
          {
            model: Element,
            as: 'elements'
          }
        ]
      })

      res.send({
        status: true,
        message: 'Jutsu aleatório retornado com sucesso.',
        data: jutsus
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

      const jutsu = await Jutsu.findOne({
        where: { id },
        include:
        [
          {
            model: GroupJutsusStamp,
            as: 'groupjutsusstamp',
            include: [{ model: Stamp, as: 'stamps' }]
          },
          {
            model: Character,
            as: 'characters'
          },
          {
            model: Classification,
            as: 'classifications'
          },
          {
            model: Class,
            as: 'classes'
          },
          {
            model: Element,
            as: 'elements'
          }
        ]
      })

      res.send({
        status: true,
        message: 'Jutsu retornado com sucesso.',
        data: jutsu
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

    const imagePath = './public/images/jutsus/' + id + '.jpg'

    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath, { root: './' })
      return
    }

    try {
      const jutsu = await Jutsu.findOne({ where: { id } })

      if (!jutsu) {
        return
      }

      let image = jutsu.image

      if (image) {
        image = image.replace('&amp;', '&')
      }

      const response = await fetch(image)
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
