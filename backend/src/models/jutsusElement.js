module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('JutsusElement', {
    elementId: DataTypes.INTEGER,
    jutsuId: DataTypes.INTEGER
  })

  Model.associate = function (models) {
    Model.belongsTo(models.Jutsu, { foreignKey: 'jutsuId' })
    Model.belongsTo(models.Element, { foreignKey: 'elementId' })
  }

  return Model
}
