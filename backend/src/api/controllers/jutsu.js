const { Jutsu, GroupJutsusStamp, Stamp, Classification, Character, Class } = require('../../models')

module.exports = {
  index: async (req, res) => {
    try {
      const jutsus = await Jutsu.findAll({
        attributes: ['id', 'class'],
        include:
        [
          {
            model: GroupJutsusStamp,
            as: 'groupjutsusstamp',
            include: [{ model: Stamp, as: 'stamps' }]
          },
          {
            model: Character,
            as: 'characters'
          },
          {
            model: Classification,
            as: 'classifications'

          },
          {
            model: Class,
            as: 'classes'
          }
        ]
      })

      res.send({
        status: true,
        message: 'Character descriptions updated.',
        data: jutsus
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
}
