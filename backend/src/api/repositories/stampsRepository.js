const { Stamp, GroupJutsusStamp, StampsSequence } = require('../../models')

module.exports = {
/**
 * @var String step
 * @var String nameStamp
 */
  createStampAndRelationship: async (nameStamp, jutsuId, order = 1, isSimultaneous = false, variant = false, step = null) => {
    // Evitando duplicados de nameStamp
    nameStamp = nameStamp.toLowerCase()
    nameStamp = nameStamp.replace('selo de uma mão', '')
    nameStamp = nameStamp.replace('selos de mão', '')
    nameStamp = nameStamp.replace('selo de mão', '')
    nameStamp = nameStamp.replace('selo de ', '')
    nameStamp = nameStamp.replace('selo do ', '')
    nameStamp = nameStamp.replace('selos', '')
    nameStamp = nameStamp.replace('selo', '')
    nameStamp = nameStamp.trim()

    if (nameStamp === 'serpente') {
      nameStamp = 'cobra'
    }

    if (nameStamp === 'bode') {
      nameStamp = 'carneiro'
    }

    if (nameStamp === 'lebre') {
      nameStamp = 'coelho'
    }

    if (nameStamp.indexOf('específicos') >= 0) {
      nameStamp = 'específicos'
    } else if (nameStamp.indexOf('específico') >= 0 || nameStamp.indexOf('específica') >= 0) {
      nameStamp = 'específico'
    }

    if (nameStamp === 'carneiro espelhado' || nameStamp === 'carneiro invertido') {
      nameStamp = 'carneiro espelhado'
    }

    if (nameStamp === 'clone') {
      nameStamp = 'clonagem'
    }

    if (nameStamp === 'javali') {
      nameStamp = 'porco'
    }

    if (nameStamp === 'yang água') {
      nameStamp = 'jin'
    }

    if (nameStamp === 'juntar as mãos') {
      nameStamp = 'mãos juntas'
    }

    if (nameStamp === 'cão') {
      nameStamp = 'cachorro'
    }

    if (nameStamp === 'bater as mãos no chão' ||
    nameStamp === 'bater no chão' ||
    nameStamp === 'ambas as palmas das mãos no chão' ||
    nameStamp === 'batida de mãos no chão') {
      nameStamp = 'bater as mãos no solo'
    }

    if (nameStamp === 'bater as mãos' || nameStamp === 'bater mãos juntas') {
      nameStamp = 'bater as mãos juntas'
    }

    let image = '/assets/images/handstamps/'

    switch (nameStamp) {
      case 'carneiro':
        image = image + 'ram.png'
        break
      case 'boi':
        image = image + 'ox.png'
        break
      case 'macaco':
        image = image + 'monkey.png'
        break
      case 'rato':
        image = image + 'mouse.png'
        break
      case 'cobra':
        image = image + 'snake.png'
        break
      case 'dragão':
        image = image + 'dragon.png'
        break
      case 'cavalo':
        image = image + 'horse.png'
        break
      case 'pássaro':
        image = image + 'bird.png'
        break
      case 'porco':
        image = image + 'pig.png'
        break
      case 'coelho':
        image = image + 'rabbit.png'
        break
      case 'tigre':
        image = image + 'tiger.png'
        break
      case 'cachorro':
        image = image + 'dog.png'
        break
      case 'confronto':
        image = image + 'confront.png'
        break
      case 'clonagem':
        image = image + 'clone.png'
        break
      case 'desconhecido':
        image = image + 'confused-face_1f615.png'
        break
      default:
        image = image + 'raised-hand_270b.png'
    }

    nameStamp = nameStamp[0].toUpperCase() + nameStamp.substring(1)

    const [stamp] = await Stamp.findOrCreate({ where: { name: nameStamp, image } })

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
