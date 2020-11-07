module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('GroupJutsusStamp', {
    jutsuId: DataTypes.INTEGER,
    variant: DataTypes.INTEGER,
    step: DataTypes.STRING,
    isSimultaneous: DataTypes.BOOLEAN
  })

  Model.associate = function (models) {
    Model.belongsToMany(models.Stamp, { through: 'StampsSequence', foreignKey: 'groupJutsusStampId', as: 'stamps' })
  }

  return Model
}
