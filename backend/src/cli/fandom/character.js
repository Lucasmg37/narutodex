const { default: Axios } = require('axios')

module.exports = {
  getFandomJutsus: async () => {
    try {
      // Busca Jutsus de personagem
      const characters = []
      let firstTime = true

      const response = await Axios.get('https://naruto.fandom.com/pt-br/wiki/Categoria:Jutsu_de_Personagens')

      let data = response.data

      let times = 0

      do {
        times = times + 1
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

        // Remover
        // if (times > 1) {
        //   break
        // }

        if (!firstTime && data.indexOf('<span>Próximo</span>') === -1) {
          break
        }
      } while (true)

      await Promise.all(characters.map(async character => {
        try {
          // Busca página com lista de Jutsus
          const jutsusCharacterResponse = await Axios.get('https://naruto.fandom.com' + character.url)

          if (!jutsusCharacterResponse.data) {
            return character
          }

          let tableList = jutsusCharacterResponse.data.split('class="tabber wds-tabber"')[1]
          tableList = tableList && tableList.split('tbody')[1]
          tableList = tableList && tableList.split('<tr>')

          delete (tableList[0])
          delete (tableList[1])

          const jutsus = []

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

          let geralTab = jutsusCharacterResponse.data.split('<th')[1]
          geralTab = geralTab && geralTab.split('</th>')[0]

          let urlAbout = geralTab.split('href="')[1] || ''
          urlAbout = urlAbout && urlAbout.split('"')[0]

          let name = geralTab.split('title="')[1]
          name = name && name.split('"')[0]

          character.name = name
          character.about_url = urlAbout
          character.jutsus_url = character.url
          character.jutsus = jutsus

          // if (urlAbout) {
          if (false) {
            const characterPage = await Axios.get('https://naruto.fandom.com' + urlAbout)

            // Pega imagem
            let aside = characterPage.data
            aside = aside.split('<aside')[1]
            aside = aside.split('</aside>')[0]

            let image = aside.split('figure')[1]
            image = image ? image.split('<a')[1] : ''

            image = image ? image.split('href="')[1] : ''
            image = image ? image.split('"')[0] : ''

            const imageFandom = image.replace('&amp;', '&') || ''
            character.image_fandom = imageFandom

            // Pega descrição
            let description = characterPage.data.split('</aside>')[1] || ''
            description = description.split('<p>')[1] || ''
            description = description.split('</p>')[0] || ''

            description = description ? description.replace(/<[^>]*>?/gm, '') : ''
            description = description.replace(/&#91;[0-9]+&#93;/gm, '')
            description = description.replace(/(\r\n|\n|\r)/gm, '')

            character.description = description
          }

          return character
        } catch (err) {
          console.log(err, character)
        }
      }))

      return characters
    } catch (err) {
      console.log(err)
    }
  }
}
