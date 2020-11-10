const { Class, JutsusClass } = require('../../models')

module.exports = {

  createClassAndRelationship: async (classJutsu, jutsuId) => {
    const [classObject] = await Class.findOrCreate({ where: { class: classJutsu } })

    await JutsusClass.findOrCreate({
      where: {
        jutsuId,
        classId: classObject.id
      }
    })
  }

}
