const inquirer = require('inquirer')

module.exports = {
  confirmAction: (callback, message = 'Tem certeza que deseja realizar esta ação?') => {
    inquirer.prompt({
      name: message,
      type: 'confirm',
      default: false
    }).then(response => {
      if (callback) {
        callback(response[message])
      }
    })
  }
}
