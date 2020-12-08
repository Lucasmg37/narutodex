
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
  }

}
