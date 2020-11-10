module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Class', {
    class: DataTypes.STRING
  })

  return Model
}
