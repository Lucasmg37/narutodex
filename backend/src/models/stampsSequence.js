module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('StampsSequence', {
    groupJutsusStampId: DataTypes.INTEGER,
    stampId: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  })

  Model.associate = function (models) {
    Model.belongsTo(models.Stamp, { foreignKey: 'stampId' })
    Model.belongsTo(models.GroupJutsusStamp, { foreignKey: 'groupJutsusStampId' })
  }

  return Model
}
