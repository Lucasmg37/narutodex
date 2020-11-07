'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'GroupJutsusStamps',
      'variant',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'GroupJutsusStamps',
      'variant'
    )
  }
}
