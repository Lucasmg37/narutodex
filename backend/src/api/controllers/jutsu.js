const { default: Axios } = require('axios')
const { Op } = require('sequelize')
const { Jutsu, GroupJutsusStamp, Stamp, Classification, Character, Class, Element } = require('../../models')
const fs = require('fs')
const fetch = require('node-fetch')

module.exports = {
  index: async (req, res) => {
    try {
      const jutsus = await Jutsu.findAll({
        // attributes: ['image']
        // where: {
        //   type: {
        //     [Op.ne]: null
        //   }
        // }
        include:
        [
          {
            model: GroupJutsusStamp,
            as: 'groupjutsusstamp',
            include: [{ model: Stamp, as: 'stamps' }]
          },
          // {
          //   model: Character,
          //   as: 'characters'
          // },
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

      const jutsusData = []

      jutsus.forEach(jutsu => {
        const newJutsu = jutsu.toJSON()

        let image = newJutsu.image

        if (image) {
          image = image.replace('&amp;', '&')
          const prefix = image.split('latest?cb=')[0]
          let date = image.split('latest?cb=')[1]
          const postfix = date.split('&')[1]
          date = image.split('&')[0]

          const d = new Date()
          const now = d.getTime()

          image = prefix + 'latest?cb=' + now + '&' + postfix
        }

        jutsusData.push({ ...newJutsu, image })
      })

      res.send({
        status: true,
        message: 'Character descriptions updated.',
        data: jutsusData
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

    const image = './public/images/jutsus/' + id + '.jpg'

    if (fs.existsSync(image)) {
      res.sendFile(image, { root: './' })
      return
    }

    try {
      const jutsu = await Jutsu.findOne({ where: { id } })

      if (!jutsu) {
        return
      }

      const newJutsu = jutsu.toJSON()

      let image = newJutsu.image

      if (image) {
        image = image.replace('&amp;', '&')
        const prefix = image.split('latest?cb=')[0]
        let date = image.split('latest?cb=')[1]
        const postfix = date.split('&')[1]
        date = image.split('&')[0]

        const d = new Date()
        const now = d.getTime()

        image = prefix + 'latest?cb=' + now + '&' + postfix
      }

      const pathImage = './public/images/jutsus/' + newJutsu.id + '.jpg'

      if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage, { root: './' })
        return
      }

      const response = await fetch(image)
      const buffer = await response.buffer()
      fs.writeFile(pathImage, buffer, () => {})

      res.sendFile(pathImage, { root: './' })
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
