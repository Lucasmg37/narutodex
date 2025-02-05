const inquirer = require('inquirer')
const { START_ALL, START_TREATMENT, GET_CHARACTERS_IMAGE_DOWNLOAD, POPULAR_BASE_DE_DADOS } = require('../constants')
const { questionsStart } = require('../questions/main')
const { index } = require('./treatment')
const { initAllDataBase } = require('../controller')

module.exports = {
  index: () => {
    inquirer.prompt(questionsStart).then(response => {
      const anwser = response[questionsStart.name]

      switch (anwser) {
        case START_ALL:
          console.log('To Do')
          break
        case START_TREATMENT:
          index()
          break
        case POPULAR_BASE_DE_DADOS:
          initAllDataBase()
          break
      }
    })
  }
}
