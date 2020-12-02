const { Sequelize } = require('sequelize')
const { Jutsu } = require('../../models')
const { createStampAndRelationship } = require('../../api/repositories/stampsRepository')
const Op = Sequelize.Op
module.exports = {
  processHandstamp: async () => {
    Sequelize.options.logging = false

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

            let nameStep = step.stamps[indexStamp]

            if (nameStep.indexOf('ou') >= 0) {
              nameStep = nameStep.split('ou')

              nameStep = nameStep.map(item => {
                return item.trim()
              })

              const insertStampsByStepWithOr = async indexStepOr => {
                const nameStepOr = nameStep[indexStepOr]

                await createStampAndRelationship(nameStepOr, firstStep[index].id, indexStepOr + 1, true, indexStep + 1, step.step)

                if (nameStep[indexStepOr + 1]) {
                  await insertStampsByStepWithOr(indexStepOr + 1)
                }
              }

              await insertStampsByStepWithOr(0)

              return
            }

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
    return true
  }

}
