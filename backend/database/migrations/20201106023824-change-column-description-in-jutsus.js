'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Jutsus',
      'description',
      {
        type: Sequelize.TEXT
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Jutsus',
      'description',
      {
        type: Sequelize.STRING
      }
    )
  }
}
