const { Jutsu } = require('../../../models')
const narutoFandom = require('../../../services/narutoFandom')

module.exports =
  async (req, res) => {
    try {
      const jutsus = await Jutsu.findAll()

      const descriptions = []

      let first = true

      await Promise.all(jutsus.map(async (jutsu, index) => {
        if (jutsu.image || !jutsu.url || jutsu.url === '') {
          return
        }

        if (jutsu.id === 538 ||
          jutsu.id === 555 ||
          jutsu.id === 675
        ) {
          return
        }

        if (!first) {
          return
        }

        first = false

        const { data } = await narutoFandom.get(jutsu.url)

        console.log(jutsu.name)

        let description = data

        description = description.split('</aside>')[1]

        if (description.indexOf('<h2>') !== -1) {
          description = description.split('<h2>')[0]
        } else if (description.indexOf('<!--') !== -1) {
          description = description.split('<!--')[0]
        } else if (description.indexOf('<div') !== -1) {
          description = description.split('<div')[0]
        }

        let aside = data
        aside = aside.split('<aside')[1]
        aside = aside.split('</aside>')[0]

        let image = aside.split('figure')[1]
        image = image.split('<a')[1]

        image = image.split('href="')[1]
        image = image.split('"')[0]

        let info = aside
        info = info.split('Informações')[1]
        info = info.split('</section>')[0]
        info = info.split('pi-item pi-data pi-item-spacing pi-border-color')

        delete (info[0])

        const infos = []

        info.forEach(element => {
          if (!element) {
            return
          }

          const data = {}

          data.title = element.split('<b>')[1]
          data.title = data.title.split('</b>')[0]

          data.content = element.split('<div class="pi-data-value pi-font">')[1]
          data.content = data.content.split('</div>')[0]
          infos.push(data)
        })

        const newData = { description, image }

        infos.forEach(info => {
          if (info.title === 'Classificação') {
            newData.classification = info.content
          }

          if (info.title === 'Rank') {
            newData.rank = info.content
          }

          if (info.title === 'Elemento') {
            newData.element = info.content
          }

          if (info.title === 'Tipo') {
            newData.type = info.content
          }

          if (info.title === 'Selos Manuais') {
            newData.handstamp = info.content
          }

          if (info.title === 'Classe') {
            newData.class = info.content
          }

          if (info.title === 'Alcance') {
            newData.reach = info.content
          }

          if (info.title === 'Jutsu Parente(s)') {
            newData.parents = info.content
          }
        })

        await Jutsu.update({ ...newData }, {
          where: {
            id: jutsu.id
          }
        })

        descriptions.push({ ...jutsu.toJSON(), ...newData })
      }))

      res.send({
        status: true,
        message: 'Jutsus updated.',
        data: descriptions
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
