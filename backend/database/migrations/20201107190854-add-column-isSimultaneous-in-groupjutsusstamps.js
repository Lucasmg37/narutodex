'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'GroupJutsusStamps',
      'isSimultaneous',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'GroupJutsusStamps',
      'isSimultaneous'
    )
  }
}
