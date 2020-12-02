
const { Jutsu } = require('../../models')
module.exports = {

  processDescription: async () => {
    const jutsus = await Jutsu.findAll({
      attributes: ['id', 'description', 'rank']
    })

    const jutsusSave = jutsus.map(jutsu => {
      if (!jutsu.description) {
        return { ...jutsu.toJSON() }
      }

      let description = jutsu.description ? jutsu.description.replace(/<[^>]*>?/gm, '') : ''
      description = description.replace(/&#91;[0-9]+&#93;/gm, '')
      description = description.replace(/(\r\n|\n|\r)/gm, '')
      return { ...jutsu.toJSON(), description }
    })

    await Promise.all(jutsusSave.forEach(async jutsu => {
      const id = jutsu.id || ''
      const description = jutsu.description || ''

      if (!description || !id) {
        return
      }

      try {
        await Jutsu.update({ description }, {
          where: {
            id
          }
        })
      } catch (err) {
        console.log(err)
      }
    }))
  },

  processRank: async () => {
    const jutsus = await Jutsu.findAll({
      attributes: ['id', 'rank']
    })

    const jutsusSave = jutsus.map(jutsu => {
      if (!jutsu.rank) {
        return { ...jutsu.toJSON() }
      }

      let rank = jutsu.rank ? jutsu.rank.replace(/<[^>]*>?/gm, '') : ''
      rank = rank.replace(/(\r\n|\n|\r)/gm, '')
      rank = rank.replace('Rank –', '')
      rank = rank.replace('Rank', '')
      rank = rank.trim()
      return { ...jutsu.toJSON(), rank }
    })

    await Promise.all(jutsusSave.forEach(async jutsu => {
      const rank = jutsu.rank || ''
      const id = jutsu.id || ''

      if (!id) {
        return
      }

      try {
        await Jutsu.update({ rank }, {
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
