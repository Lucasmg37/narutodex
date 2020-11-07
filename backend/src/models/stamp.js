module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Stamp', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    image: DataTypes.STRING
  })

  return Model
}
