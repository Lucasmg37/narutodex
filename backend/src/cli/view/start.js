const inquirer = require('inquirer')
const { START_ALL, START_GET, START_TREATMENT } = require('../constants')
const { questionsStart } = require('../questions/main')
const { index } = require('./treatment')

module.exports = {
  index: () => {
    inquirer.prompt(questionsStart).then(response => {
      const anwser = response[questionsStart.name]

      switch (anwser) {
        case START_ALL:
          console.log('To Do')
          break
        case START_GET:
          console.log('To Do')
          break
        case START_TREATMENT:
          index()
          break
      }
    })
  }
}
