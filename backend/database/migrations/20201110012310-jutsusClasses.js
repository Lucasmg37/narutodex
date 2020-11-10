'use strict'

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable('JutsusClasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      classId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      jutsuId: {
        allowNull: false,
        type: DataTypes.INTEGER
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
    return queryInterface.dropTable('JutsusClasses')
  }
}
