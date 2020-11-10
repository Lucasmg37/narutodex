const { Classification, JutsusClassification } = require('../../models')

module.exports = {

  createClassificationAndRelationship: async (classification, jutsuId) => {
    const [classificationObject] = await Classification.findOrCreate({ where: { classification: classification } })

    await JutsusClassification.findOrCreate({
      where: {
        jutsuId,
        classificationId: classificationObject.id
      }
    })
  }

}
