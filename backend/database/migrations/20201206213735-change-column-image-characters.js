'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Characters',
      'image_fandom',
      { type: Sequelize.STRING }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Characters',
      'image_fandom',
      {
        type: Sequelize.INTEGER
      }
    )
  }
}
