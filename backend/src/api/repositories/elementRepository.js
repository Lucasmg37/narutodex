const { Element, JutsusElement } = require('../../models')

module.exports = {

  createElementAndRelationship: async (element, jutsuId) => {
    const [elementObject] = await Element.findOrCreate({ where: { element } })

    await JutsusElement.findOrCreate({
      where: {
        jutsuId,
        elementId: elementObject.id
      }
    })
  }

}
