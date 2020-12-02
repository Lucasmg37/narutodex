const { getTextInsideTag, getAttributeTag } = require('../../../helpers/text')
const { Jutsu } = require('../../../models')
const { createClassificationAndRelationship } = require('../../repositories/classificationRepository')
const { createClassAndRelationship } = require('../../repositories/classRepository')
const { createElementAndRelationship } = require('../../repositories/elementRepository')

module.exports = {
  processClassification: async (req, res) => {
    try {
      const jutsus = await Jutsu.findAll({
        attributes: ['id', 'classification']
      })

      const jutsusClassification = []

      jutsus.forEach(jutsu => {
        if (!jutsu.classification) {
          return
        }

        const classifications = jutsu.classification.split(',')
        const classificationsToSave = []

        const addClassificationIfNotExists = classification => {
          if (classificationsToSave.indexOf(classification) === -1) {
            classificationsToSave.push(classification)
          }
        }

        classifications.forEach(classification => {
          const newClassification = getTextInsideTag('a', classification)

          let attrImage = getAttributeTag('img', 'data-image-name', newClassification)

          if (attrImage) {
            attrImage = attrImage.replace('Símbolo', '')
            attrImage = attrImage.replace('.svg', '').trim()
            addClassificationIfNotExists(attrImage)
          }

          if (newClassification && newClassification.indexOf('img') === -1) {
            addClassificationIfNotExists(newClassification)
          }

          if (classification.indexOf('Kekkei Genkai') > 1) {
            addClassificationIfNotExists('Kekkei Genkai')
          }

          if (classification.indexOf('Hiden') > 1) {
            addClassificationIfNotExists('Hiden')
          }

          if (classification.indexOf('Clã Yamanaka') > 1) {
            addClassificationIfNotExists('Clã Yamanaka')
          }

          if (classification.indexOf('Liberação de Magnetismo') > 1) {
            addClassificationIfNotExists('Liberação de Magnetismo')
          }

          if (classification.indexOf('Clã Hyuga') > 1) {
            addClassificationIfNotExists('Clã Hyuga')
          }

          if (classification.indexOf('<') === -1 && classification.indexOf('>') === -1) {
            addClassificationIfNotExists(classification)
          }
        })

        jutsusClassification.push({ id: jutsu.toJSON().id, classifications: classificationsToSave })
      })

      const createClassificationByJutsu = async index => {
        const jutsuId = jutsusClassification[index].id
        const classificationsByJutsu = jutsusClassification[index].classifications

        const createClassification = async index => {
          const classification = classificationsByJutsu[index]

          await createClassificationAndRelationship(classification, jutsuId)

          if (classificationsByJutsu[index + 1]) {
            await createClassification(index + 1)
          }
        }

        await createClassification(0)

        if (jutsusClassification[index + 1]) {
          await createClassificationByJutsu(index + 1)
        }
      }

      await createClassificationByJutsu(0)

      res.send({
        status: true,
        message: jutsus.length + ' jutsus fouded.',
        data: jutsusClassification
      }).status(200)
    } catch (err) {
      console.error(err)
      res.send({
        status: true,
        message: 'Erro!',
        data: err
      }).status(500)
    }
  },

  processClass: async (req, res) => {
    try {
      const jutsus = await Jutsu.findAll({
        attributes: ['id', 'class']
      })

      const jutsusClasses = []

      jutsus.forEach(jutsu => {
        if (!jutsu.class) {
          return
        }

        let classToSave = jutsu.class.replace(' e ', ',').split(',')

        classToSave = classToSave.map(classJutsu => {
          return classJutsu.trim()
        })

        jutsusClasses.push({ id: jutsu.toJSON().id, classes: classToSave })
      })

      const createClassesByJutsu = async index => {
        const jutsuId = jutsusClasses[index].id
        const classes = jutsusClasses[index].classes

        const createClass = async index => {
          const classJutsu = classes[index]

          await createClassAndRelationship(classJutsu, jutsuId)

          if (classes[index + 1]) {
            await createClass(index + 1)
          }
        }

        await createClass(0)

        if (jutsusClasses[index + 1]) {
          await createClassesByJutsu(index + 1)
        }
      }

      await createClassesByJutsu(0)

      res.send({
        status: true,
        message: jutsus.length + ' jutsus fouded.',
        data: jutsusClasses
      }).status(200)
    } catch (err) {
      console.error(err)
      res.send({
        status: true,
        message: 'Erro!',
        data: err
      }).status(500)
    }
  },

  processElement: async (req, res) => {
    try {
      const jutsus = await Jutsu.findAll({
        attributes: ['id', 'element']
      })

      const jutsusSave = jutsus.map(jutsu => {
        let element = jutsu.element ? jutsu.element.replace(/<[^>]*>?/gm, '') : ''
        element = element.replace(/(\r\n|\n|\r)/gm, '')
        element = element.split('Liberação de')

        const elements = []

        element.forEach(item => {
          item = item.trim()

          if (item) {
            if (item === 'Yin–Yang') {
              elements.push('Yin')
              elements.push('Yang')
              return
            }

            elements.push(item)
          }
        })

        return { ...jutsu.toJSON(), elements }
      })

      const saveElementByJutsu = async (index) => {
        const jutsu = jutsusSave[index]

        const saveElement = async (indexEvent) => {
          const element = jutsu.elements[indexEvent]

          if (!element) {
            return
          }

          console.log(element, jutsu.id)

          await createElementAndRelationship(element, jutsu.id)

          if (jutsu.elements[indexEvent + 1]) {
            await saveElement(indexEvent + 1)
          }
        }

        await saveElement(0)

        if (jutsusSave[index + 1]) {
          await saveElementByJutsu(index + 1)
        }
      }

      await saveElementByJutsu(0)

      res.send({
        status: true,
        message: jutsus.length + ' jutsus fouded.',
        data: jutsusSave
      }).status(200)
    } catch (err) {
      console.error(err)
      res.send({
        status: true,
        message: 'Erro!',
        data: err
      }).status(500)
    }
  }

}
