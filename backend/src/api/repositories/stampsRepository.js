const { Stamp, GroupJutsusStamp, StampsSequence } = require('../../models')

module.exports = {

  createStampAndRelationship: async (nameStamp, jutsuId, order = 1, isSimultaneous = false, variant = false, step = null) => {
    const [stamp] = await Stamp.findOrCreate({ where: { name: nameStamp } })

    const whereGroupJutsusStamps = {
      jutsuId
    }

    if (isSimultaneous) {
      whereGroupJutsusStamps.isSimultaneous = isSimultaneous
    }

    if (variant) {
      whereGroupJutsusStamps.variant = variant
    }

    if (step) {
      whereGroupJutsusStamps.step = step
    }

    const [groupJutsusStamp] = await GroupJutsusStamp.findOrCreate({
      where: whereGroupJutsusStamps
    })

    await StampsSequence.findOrCreate({
      where: {
        stampId: stamp.id,
        groupJutsusStampId: groupJutsusStamp.id,
        order
      }
    })
  }

}
