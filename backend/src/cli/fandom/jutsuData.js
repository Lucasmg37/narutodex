const { createStampAndRelationship } = require('../../api/repositories/stampsRepository')
const { getTextInsideTag, getAttributeTag } = require('../../helpers/text')
const narutoFandom = require('../../services/narutoFandom')

module.exports = {
  getJutsusByCharacter: async (characters) => {
    try {
      const jutsus = []
      const jutsusObj = []

      characters.forEach(item => {
        item.jutsus && item.jutsus.forEach(jutsu => {
          if (!jutsus.includes(jutsu.url)) {
            jutsus.push(jutsu.url)
            jutsusObj.push(jutsu)
          }
        })
      })

      const jutsusDetails = []

      console.log(jutsusObj.length)

      await Promise.all(jutsusObj.map(async (jutsu) => {
        try {
          if (jutsu.title.indexOf('(página inexistente)') > 0) {
            return
          }

          if (jutsu.url === '/pt-br/wiki/Mangeky%C5%8D_Sharingan' ||
            jutsu.url === '/pt-br/wiki/Selo_Amaldi%C3%A7oado_da_Terra' ||
            jutsu.url === '/pt-br/wiki/Selo_Amaldi%C3%A7oado_do_C%C3%A9u'
          ) {
            return
          }

          const { data } = await narutoFandom.get(jutsu.url)

          let description = data

          description = description.split('</aside>')[1]

          if (description.indexOf('<h2>') !== -1) {
            description = description.split('<h2>')[0]
          } else if (description.indexOf('<!--') !== -1) {
            description = description.split('<!--')[0]
          } else if (description.indexOf('<div') !== -1) {
            description = description.split('<div')[0]
          }

          description = description ? description.replace(/<[^>]*>?/gm, '') : ''
          description = description.replace(/&#91;[0-9]+&#93;/gm, '')
          description = description.replace(/(\r\n|\n|\r)/gm, '')

          let aside = data
          aside = aside.split('<aside')[1] || ''
          aside = aside.split('</aside>')[0] || ''

          let image = aside.split('figure')[1] || ''
          image = image.split('<a')[1] || ''

          image = image.split('href="')[1] || ''
          image = image.split('"')[0] || ''
          image = image.replace('&amp;', '&')

          let info = aside
          info = info.split('Informações')[1] || ''
          info = info.split('</section>')[0] || ''
          info = info.split('pi-item pi-data pi-item-spacing pi-border-color')

          delete (info[0])

          const infos = []

          info.forEach(element => {
            if (!element) {
              return
            }

            const data = {}

            data.title = element.split('<b>')[1]
            data.title = data.title.split('</b>')[0]

            data.content = element.split('<div class="pi-data-value pi-font">')[1]
            data.content = data.content.split('</div>')[0]
            infos.push(data)
          })

          const newData = { description, image, ...jutsu }

          infos.forEach(info => {
            if (info.title === 'Classificação') {
              if (!info.content) {
                return
              }

              const classifications = info.content.split(',')
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

              newData.classifications = classificationsToSave
            } else {
              newData.classifications = []
            }

            if (info.title === 'Rank') {
              let rank = info.content ? info.content.replace(/<[^>]*>?/gm, '') : ''
              rank = rank.replace(/(\r\n|\n|\r)/gm, '')
              rank = rank.replace('Rank –', '')
              rank = rank.replace('Rank', '')
              rank = rank.trim()
              newData.rank = rank
            } else {
              newData.rank = null
            }

            if (info.title === 'Elemento') {
              let element = info.content ? info.content.replace(/<[^>]*>?/gm, '') : ''
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
              newData.elements = elements
            } else {
              newData.elements = []
            }

            if (info.title === 'Tipo') {
              newData.type = info.content
            }

            if (info.title === 'Selos Manuais') {
              // Insert Jutsus with Custom Step
              if (jutsu.url === '/pt-br/wiki/Libera%C3%A7%C3%A3o_de_Fogo:_T%C3%A9cnica_da_Grande_Bola_de_Fogo') {
                newData.handstamps = []
              } else if (info.content.indexOf('<') >= 0) {
                let stamps = info.content

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

                newData.handstamps = stepsSave.map((step, indexStep) => {
                  return step.stamps.map((nameStep, indexStamp) => {
                    if (nameStep.indexOf('ou') >= 0) {
                      nameStep = nameStep.split('ou')

                      nameStep = nameStep.map(item => {
                        return item.trim()
                      })

                      return nameStep.map((nameStepOr, indexStepOr) => {
                        return createStampAndRelationship(nameStepOr, indexStepOr + 1, true, indexStep + 1, step.step)
                      })
                    }
                    return createStampAndRelationship(nameStep, indexStamp + 1, false, indexStep + 1, step.step)
                  })
                })
              } else if (info.content.indexOf('ou') >= 0) {
                // Insert Jutsus with Two Variants OR
                let stamps = info.content

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

                const variants = [variantOne, variantTwo]
                newData.handstamps = variants.map((variant, index) => {
                  return variant.map((item, indexitem) => {
                    return createStampAndRelationship(item, indexitem + 1, false, index + 1)
                  })
                })
              } else if (info.content.indexOf('+') >= 0 || info.content.indexOf('→') >= 0) {
                const hasSimultaneous = info.content.indexOf('+') >= 0
                //  Simuntaneos or sequence - Insert Jutsus with N hands stamps
                let stamps = info.content

                stamps = stamps.replace('simultâneamente', '')
                stamps = stamps.replace('(Simultaneamente)', '')
                stamps = stamps.replace('simultaneamente', '')
                stamps = stamps.replace('Simultaneamente', '')

                stamps = stamps.split(hasSimultaneous ? '+' : '→')
                stamps = stamps.map(stamp => {
                  return stamp.trim()
                })

                newData.handstamps = [stamps.map((item, index) => {
                  return createStampAndRelationship(item, index + 1, hasSimultaneous)
                })]
              } else {
                // Has one
                newData.handstamps = [[createStampAndRelationship(info.content, 1)]]
              }
            } else {
              newData.handstamps = []
            }

            if (info.title === 'Classe') {
              let classToSave = info.content.replace(' e ', ',').split(',')
              classToSave = classToSave.map(classJutsu => {
                return classJutsu.trim()
              })

              newData.classes = classToSave
            } else {
              newData.classes = []
            }

            if (info.title === 'Alcance') {
              newData.reachs = info.content
            } else {
              newData.reachs = null
            }

            if (info.title === 'Jutsu Parente(s)') {
              newData.parents = info.content
            } else {
              newData.parents = null
            }
          })

          jutsusDetails.push({ ...newData })
        } catch (err) {
          console.log(err, jutsu)
        }
      }))

      return jutsusDetails
    } catch (err) {
      console.error(err)
    }
  }
}
