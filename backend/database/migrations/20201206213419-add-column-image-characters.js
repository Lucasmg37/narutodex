'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Characters',
      'image_fandom',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Characters',
      'image_fandom'
    )
  }
}
