const inquirer = require('inquirer')
const ora = require('ora')
const { questionsTreatmentJutsus } = require('../questions/main')
const { TREATMENT_JUTSUS_DESCRIPTION, TREATMENT_JUTSUS_RANK } = require('../constants')
const { confirmAction } = require('../utils/inquirer')
const { processDescription, processRank } = require('../controllers/jutsus')

module.exports = {
  index: () => {
    inquirer.prompt(questionsTreatmentJutsus).then(response => {
      const anwser = response[questionsTreatmentJutsus.name]

      switch (anwser) {
        case TREATMENT_JUTSUS_DESCRIPTION:
          confirmAction(async (response) => {
            if (!response) {
              console.log('Ação finalizada pelo usuário')
              return
            }

            const spinner = ora('Tratando as Descrições dos Jutsus').start()
            try {
              await processDescription()
              spinner.succeed('Descrições tratados.')
            } catch (err) {
              spinner.fail('Ocorreu um erro tratar as Descrições dos Jutsus.')
              console.error(err)
            }
          })
          break
        case TREATMENT_JUTSUS_RANK:
          confirmAction(async (response) => {
            if (!response) {
              console.log('Ação finalizada pelo usuário')
              return
            }

            const spinner = ora('Tratando os Ranks dos Jutsus').start()
            try {
              await processRank()
              spinner.succeed('Rank tratados.')
            } catch (err) {
              spinner.fail('Ocorreu um erro tratar os Rank dos Jutsus.')
              console.error(err)
            }
          })
          break
      }
    })
  }
}
