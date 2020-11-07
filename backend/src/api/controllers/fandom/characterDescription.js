const { Character } = require('../../../models')
const narutoFandom = require('../../../services/narutoFandom')

module.exports =
  async (req, res) => {
    try {
      const characters = await Character.findAll()

      await Promise.all(characters.map(async (character, index) => {
        try {
          let { data } = await narutoFandom.get(character.about_url)

          if (!data) {
            return character
          }

          data = data.split('</aside>')[1]
          data = data.split('<p>')[1]
          const description = data.split('</p>')[0]

          await Character.update({ description }, {
            where: {
              id: character.id
            }
          })

          return character
        } catch (err) {
          console.log(character)
        }
      }))

      res.send({
        status: true,
        message: 'Character descriptions updated.',
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
  }
