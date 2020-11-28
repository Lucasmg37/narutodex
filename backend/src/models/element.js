module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Element', {
    element: DataTypes.STRING
  })

  return Model
}
