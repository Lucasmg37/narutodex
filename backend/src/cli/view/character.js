const inquirer = require('inquirer')
const ora = require('ora')
const { questionsCharacter, questionsTreatmentCharacter } = require('../questions/main')
const { GET_CHARACTERS_IMAGE, TREATMENT_CHARACTERS_DESCRIPTION } = require('../constants')
const { confirmAction } = require('../utils/inquirer')
const { getImages, processDescription } = require('../controllers/characters')

module.exports = {

  get: () => {
    inquirer.prompt(questionsCharacter).then(response => {
      const anwser = response[questionsCharacter.name]

      switch (anwser) {
        case GET_CHARACTERS_IMAGE:
          confirmAction(async (response) => {
            if (!response) {
              console.log('Ação finalizada pelo usuário')
              return
            }

            const spinner = ora('Buscando as Imagens dos Personagens').start()
            try {
              await getImages()
              spinner.succeed('Imagens buscadas.')
            } catch (err) {
              spinner.fail('Ocorreu um erro tratar as Imagens dos Personagens.')
              console.error(err)
            }
          })
          break
      }
    })
  },
  treatment: () => {
    inquirer.prompt(questionsTreatmentCharacter).then(response => {
      const anwser = response[questionsTreatmentCharacter.name]

      switch (anwser) {
        case TREATMENT_CHARACTERS_DESCRIPTION:
          confirmAction(async (response) => {
            if (!response) {
              console.log('Ação finalizada pelo usuário')
              return
            }

            const spinner = ora('Processando as descrições de Personagens.').start()
            try {
              processDescription()
              spinner.succeed('Processamento finalizado.')
            } catch (err) {
              spinner.fail('Ocorreu um erro Processar as descrições dos Personagens.')
              console.error(err)
            }
          })
          break
      }
    })
  }
}
