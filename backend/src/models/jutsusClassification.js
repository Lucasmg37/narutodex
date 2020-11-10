module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('JutsusClassification', {
    classificationId: DataTypes.INTEGER,
    jutsuId: DataTypes.INTEGER
  })

  Model.associate = function (models) {
    Model.belongsTo(models.Jutsu, { foreignKey: 'jutsuId' })
    Model.belongsTo(models.Classification, { foreignKey: 'classificationId' })
  }

  return Model
}
