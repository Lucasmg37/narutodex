'use strict'

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      class: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Classes')
  }
}
