const { Jutsu, GroupJutsusStamp, Stamp } = require('../../models')

module.exports = {
  index: async (req, res) => {
    try {
      const jutsus = await Jutsu.findAll({
        include:
        [
          {
            model: GroupJutsusStamp,
            as: 'groupjutsusstamp',
            include: [{ model: Stamp, as: 'stamps' }]
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
