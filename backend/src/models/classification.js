module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Classification', {
    classification: DataTypes.STRING,
    image: DataTypes.STRING
  })

  return Model
}
