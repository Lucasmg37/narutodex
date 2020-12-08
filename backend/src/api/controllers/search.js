const { Op } = require('sequelize')
const { Jutsu, Character } = require('../../models')

module.exports = {
  index: async (req, res) => {
    const { q } = req.query

    try {
      if (!q) {
        throw 'O pesquisa deve ter no mínimo 3 caracters.'
      }

      const jutsus = await Jutsu.findAll({
        where: {
          name: {
            [Op.substring]: q
          }
        }
      })

      const characters = await Character.findAll({
        where: {
          name: {
            [Op.substring]: q
          }
        }
      })

      const jutsusData = []

      jutsus.forEach(jutsu => {
        const newJutsu = jutsu.toJSON()
        const image = 'http://localhost:3333/api/v1/jutsu/' + newJutsu.id + '/image'
        jutsusData.push({ ...newJutsu, image, isJutsu: true })
      })

      const charactersData = []

      characters.forEach(character => {
        character = character.toJSON()
        const image = 'http://localhost:3333/api/v1/character/' + character.id + '/image'
        charactersData.push({ ...character, image })
      })

      let data = jutsusData.concat(charactersData)

      data = data.sort(function (a, b) {
        if (a.name > b.name) {
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        return 0
      })

      res.send({
        status: true,
        message: 'Search succesfully.',
        data: data
      }).status(200)
    } catch (err) {
      console.error(err)
      res.send({
        status: true,
        message: err
      }).status(500)
    }
  }

}
