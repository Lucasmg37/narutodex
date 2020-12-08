const inquirer = require('inquirer')
const ora = require('ora')
const { questionsCharacter } = require('../questions/main')
const { GET_CHARACTERS_IMAGE } = require('../constants')
const { confirmAction } = require('../utils/inquirer')
const { getImages } = require('../controllers/characters')

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
  }
}
