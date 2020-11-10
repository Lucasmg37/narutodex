const { Sequelize } = require('sequelize')
const { getTextInsideTag, getAttributeTag } = require('../../../helpers/text')
const { Jutsu } = require('../../../models')
const { createStampAndRelationship } = require('../../repositories/stampsRepository')
const { createClassificationAndRelationship } = require('../../repositories/classificationRepository')
const { createClassAndRelationship } = require('../../repositories/classRepository')
const Op = Sequelize.Op

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
  processHandstamp: async (req, res) => {
    try {
      const jutsus = await Jutsu.findAll(
        {
          attributes: ['handstamp', 'id'],
          where: {
            handstamp: {
              [Op.ne]: null
            }
          }
        }
      )

      const firstStep = []

      jutsus.forEach(async jutsu => {
        if (jutsu.handstamp.indexOf('<') >= 0) {
          firstStep.push({ ...jutsu.toJSON(), hasSteps: true })
          return
        }

        if (jutsu.handstamp.indexOf('ou') >= 0) {
          firstStep.push({ ...jutsu.toJSON(), hasTwoVariants: true })
          return
        }

        if (jutsu.handstamp.indexOf('+') >= 0) {
          firstStep.push({ ...jutsu.toJSON(), hasSimultaneous: true })
          return
        }

        if (jutsu.handstamp.indexOf('→') >= 0) {
          firstStep.push({ ...jutsu.toJSON(), hasSequence: true })
          return
        }

        firstStep.push({ ...jutsu.toJSON(), hasOne: true })
      })

      const createStampsForJutsus = async (index) => {
        // Insert Jutsus with One hans stamps
        if (firstStep[index].hasOne) {
          await createStampAndRelationship(firstStep[index].handstamp, firstStep[index].id, 1)
        }

        // Insert Jutsus with N hands stamps
        if (firstStep[index].hasSequence || firstStep[index].hasSimultaneous) {
          let stamps = firstStep[index].handstamp

          stamps = stamps.replace('simultâneamente', '')
          stamps = stamps.replace('(Simultaneamente)', '')
          stamps = stamps.replace('simultaneamente', '')
          stamps = stamps.replace('Simultaneamente', '')

          stamps = stamps.split(firstStep[index].hasSimultaneous ? '+' : '→')
          stamps = stamps.map(stamp => {
            return stamp.trim()
          })

          const insertMultiplesStamps = async indexStamp => {
            await createStampAndRelationship(stamps[indexStamp], firstStep[index].id, indexStamp + 1, firstStep[index].hasSimultaneous)

            if (stamps[indexStamp + 1]) {
              await insertMultiplesStamps(indexStamp + 1)
            }
          }

          await insertMultiplesStamps(0)
        }

        // Insert Jutsus with Two Variants OR
        if (firstStep[index].hasTwoVariants) {
          if (firstStep[index].id === 537) {
            await createStampsForJutsus(index + 1)
            return
          }

          let stamps = firstStep[index].handstamp

          stamps = stamps.split('(').join('')
          stamps = stamps.split(')').join('')

          stamps = stamps.split('ou')

          let variantOne = stamps[0]
          let variantTwo = stamps[1]

          if (variantOne.indexOf('→') < 0) {
            variantOne = [variantOne]
          } else {
            variantOne = variantOne.split('→')
          }

          variantOne = variantOne.map(stamp => {
            return stamp.trim()
          })

          if (variantTwo.indexOf('→') < 0) {
            variantTwo = [variantTwo]
          } else {
            variantTwo = variantTwo.split('→')
          }

          variantTwo = variantTwo.map(stamp => {
            return stamp.trim()
          })

          const insertMultiplesStampsVariantOne = async indexStamp => {
            await createStampAndRelationship(variantOne[indexStamp], firstStep[index].id, indexStamp + 1, false, 1)

            if (variantOne[indexStamp + 1]) {
              await insertMultiplesStampsVariantOne(indexStamp + 1)
            }
          }

          const insertMultiplesStampsVariantTwo = async indexStamp => {
            await createStampAndRelationship(variantTwo[indexStamp], firstStep[index].id, indexStamp + 1, false, 2)

            if (variantTwo[indexStamp + 1]) {
              await insertMultiplesStampsVariantTwo(indexStamp + 1)
            }
          }

          await insertMultiplesStampsVariantOne(0)
          await insertMultiplesStampsVariantTwo(0)
        }

        // Insert Jutsus with Custom Step
        if (firstStep[index].hasSteps) {
          let stamps = firstStep[index].handstamp

          stamps = stamps.split('<b>').join('')
          stamps = stamps.split(':').join('')
          stamps = stamps.split('(').join('')
          stamps = stamps.split(')').join('')

          const steps = stamps.split('<br>')

          const stepsSave = []

          steps.forEach(step => {
            let [stepName, stamps] = step.split('</b>')

            if (!stamps) {
              return
            }

            if (stamps.indexOf('→') < 0) {
              stamps = [stamps]
            } else {
              stamps = stamps.split('→')
            }

            stamps = stamps.map(stamp => {
              return stamp.trim()
            })

            stepsSave.push({ step: stepName, stamps })
          })

          const insertStep = async indexStep => {
            const insertStampsByStap = async (indexStamp) => {
              const step = stepsSave[indexStep]

              await createStampAndRelationship(step.stamps[indexStamp], firstStep[index].id, indexStamp + 1, false, indexStep + 1, step.step)

              if (step.stamps[indexStamp + 1]) {
                await insertStampsByStap(indexStamp + 1)
              }
            }

            await insertStampsByStap(0)

            if (stepsSave[indexStep + 1]) {
              await insertStep(indexStep + 1)
            }
          }

          await insertStep(0)
        }

        if (firstStep[index + 1]) {
          await createStampsForJutsus(index + 1)
        }
      }

      await createStampsForJutsus(0)

      res.send({
        status: true,
        message: jutsus.length + ' jutsus fouded.',
        data: firstStep
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
