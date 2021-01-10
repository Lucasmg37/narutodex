
const { Character } = require('../../models')
const narutoFandom = require('../../services/narutoFandom')
module.exports = {

  getImages: async () => {
    const characters = await Character.findAll({
      attributes: ['id', 'about_url']
    })

    const insertImage = async index => {
      const character = characters[index]
      const { data } = await narutoFandom.get(character.about_url)

      let aside = data
      aside = aside.split('<aside')[1]
      aside = aside.split('</aside>')[0]

      let image = aside.split('figure')[1]
      image = image ? image.split('<a')[1] : ''

      image = image ? image.split('href="')[1] : ''
      image = image ? image.split('"')[0] : ''

      const imageFandom = image.replace('&amp;', '&')

      await Character.update({ image_fandom: imageFandom }, {
        where: {
          id: character.id
        }
      })

      if (characters[index + 1]) {
        await insertImage(index + 1)
      }
    }

    await insertImage(0)
  },

  processDescription: async () => {
    const characters = await Character.findAll({
      attributes: ['id', 'description']
    })

    const charactersSave = characters.map(character => {
      if (!character.description) {
        return { ...character.toJSON() }
      }

      let description = character.description ? character.description.replace(/<[^>]*>?/gm, '') : ''
      description = description.replace(/&#91;[0-9]+&#93;/gm, '')
      description = description.replace(/(\r\n|\n|\r)/gm, '')
      return { ...character.toJSON(), description }
    })

    await Promise.all(charactersSave.forEach(async character => {
      const id = character.id || ''
      const description = character.description || ''

      if (!description || !id) {
        return
      }

      try {
        await Character.update({ description }, {
          where: {
            id
          }
        })
      } catch (err) {
        console.log(err)
      }
    }))
  }

}
