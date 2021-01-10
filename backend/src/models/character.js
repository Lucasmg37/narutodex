module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    jutsus_url: DataTypes.STRING,
    about_url: DataTypes.STRING,
    image_fandom: DataTypes.STRING
  })

  Character.associate = function (models) {
    Character.belongsToMany(models.Jutsu, { through: 'CharactersJutsu', foreignKey: 'characterId', as: 'jutsus' })
  }

  return Character
}
