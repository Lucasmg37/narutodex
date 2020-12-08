const inquirer = require('inquirer')

const { questionsGet } = require('../questions/main')
const { GET_CHARACTERS } = require('../constants')
const { get } = require('./character')

module.exports = {
  index: () => {
    inquirer.prompt(questionsGet).then(response => {
      const anwser = response[questionsGet.name]

      switch (anwser) {
        case GET_CHARACTERS:
          get()
          break
      }
    })
  }
}
