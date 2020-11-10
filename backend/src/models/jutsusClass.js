module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('JutsusClass', {
    classId: DataTypes.INTEGER,
    jutsuId: DataTypes.INTEGER
  })

  Model.associate = function (models) {
    Model.belongsTo(models.Jutsu, { foreignKey: 'jutsuId' })
    Model.belongsTo(models.Class, { foreignKey: 'classId' })
  }

  return Model
}
