const { Character, Jutsu, CharactersJutsu } = require('../../../models')
const narutoFandom = require('../../../services/narutoFandom')

module.exports =
  async (req, res) => {
    try {
      const characters = await Character.findAll()

      await Promise.all(characters.map(async (character, index) => {
        try {
          const jutsus = []

          const { data } = await narutoFandom.get(character.jutsus_url)

          if (!data) {
            return character
          }

          let tableList = data.split('<div class="tabbertab" title="Anime ">')[1]
          tableList = tableList && tableList.split('tbody')[1]
          tableList = tableList && tableList.split('<tr>')

          delete (tableList[0])
          delete (tableList[1])

          tableList.forEach(element => {
            if (!element) {
              return
            }

            let url = element.split('href="')[1]
            url = url && url.split('"')[0]

            let title = element.split('title="')[1]
            title = title && title.split('"')[0]

            jutsus.push({ title, url })
          })

          await Promise.all(jutsus.forEach(async element => {
            try {
              const jutsuFind = await Jutsu.findOne({
                where: { url: element.url }
              })

              if (jutsuFind !== null) {
                const characterJutsuFind = await CharactersJutsu.findOne({
                  where: { characterId: character.id, jutsuId: jutsuFind.id }
                })

                if (characterJutsuFind === null) {
                  await CharactersJutsu.create({
                    characterId: character.id, jutsuId: jutsuFind.id
                  })
                }
                return
              }

              const jutsu = await Jutsu.create({
                name: element.title, url: element.url
              })

              await CharactersJutsu.create({
                characterId: character.id, jutsuId: jutsu.id
              })
            } catch (err) {
              console.log(err)
            }
          }))
        } catch (err) {
          console.log(character.name)
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
