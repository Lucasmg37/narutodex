const inquirer = require('inquirer')
const ora = require('ora')
const { questionsTreatment } = require('../questions/main')
const { TREATMENT_STAMPS, TREATMENT_JUTSUS, TREATMENT_CHARACTERS } = require('../constants')
const { confirmAction } = require('../utils/inquirer')
const { processHandstamp } = require('../controllers/stamps')
const { index } = require('./jutsu')
const { treatment } = require('./character')

module.exports = {
  index: () => {
    inquirer.prompt(questionsTreatment).then(response => {
      const anwser = response[questionsTreatment.name]

      switch (anwser) {
        case TREATMENT_STAMPS:
          confirmAction(async (response) => {
            if (!response) {
              console.log('Ação finalizada pelo usuário')
              return
            }

            const spinner = ora('Tratando os Selos').start()
            try {
              await processHandstamp()
              spinner.succeed('Selos tratados.')
            } catch (err) {
              spinner.fail('Ocorreu um erro tratar os selos.')
              console.err(err)
            }
          })
          break
        case TREATMENT_JUTSUS:
          index()
          break
        case TREATMENT_CHARACTERS:
          treatment()
          break
      }
    })
  }
}
