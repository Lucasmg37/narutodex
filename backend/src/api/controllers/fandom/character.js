const { default: Axios } = require('axios')
const { Character } = require('../../../models')

module.exports =
  async (req, res) => {
    try {
      const characters = []
      let firstTime = true

      const response = await Axios.get('https://naruto.fandom.com/pt-br/wiki/Categoria:Jutsu_de_Personagens')

      let data = response.data

      do {
        if (!firstTime) {
          let paginationHtml = data

          paginationHtml = paginationHtml.split('<span>Próximo</span>')[0]
          paginationHtml = paginationHtml.split('<a').pop()

          let next = paginationHtml.split('href="')[1]
          next = next.split('"')[0]
          const responseNext = await Axios.get(next)
          data = responseNext.data
        }

        firstTime = false

        let cleanHtml = data
        cleanHtml = cleanHtml.split('category-page__members-for-char')[1]
        cleanHtml = cleanHtml.split('</ul>')[0]
        const lis = cleanHtml.split('<li')

        delete (lis[0])

        lis.forEach(element => {
          if (!element) {
            return
          }

          let url = element.split('href="')[1]
          url = url && url.split('"')[0]

          let title = element.split('title="')[1]
          title = title && title.split('"')[0]

          if (title && url) {
            characters.push({ url, title })
          }
        })

        if (!firstTime && data.indexOf('<span>Próximo</span>') === -1) {
          break
        }
      } while (true)

      await Promise.all(characters.map(async character => {
        try {
          const find = await Character.findOne({
            where: { jutsus_url: character.url }
          })

          if (find !== null) {
            return character
          }

          const jutsusCharacterResponse = await Axios.get('https://naruto.fandom.com' + character.url)

          if (!jutsusCharacterResponse.data) {
            return character
          }

          let geralTab = jutsusCharacterResponse.data.split('<th')[1]
          geralTab = geralTab && geralTab.split('</th>')[0]

          let urlAbout = geralTab.split('href="')[1]
          urlAbout = urlAbout && urlAbout.split('"')[0]

          let name = geralTab.split('title="')[1]
          name = name && name.split('"')[0]

          character.name = name
          character.about_url = urlAbout

          await Character.create({
            name: character.name, about_url: character.about_url, jutsus_url: character.url
          })

          return character
        } catch (err) {
          console.log(character)
        }
      }))

      res.send({
        status: true,
        message: 'Jutsus list loaded.',
        data: characters
      }).status(200)
    } catch (err) {
      res.send({
        status: true,
        message: 'Erro!'
      }).status(500)
    }
  }
