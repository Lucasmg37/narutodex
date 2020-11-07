module.exports = (sequelize, DataTypes) => {
  const CharactersJutsu = sequelize.define('CharactersJutsu', {
    characterId: DataTypes.INTEGER,
    jutsuId: DataTypes.INTEGER
  })

  CharactersJutsu.associate = function (models) {
    CharactersJutsu.belongsTo(models.Jutsu, { foreignKey: 'jutsuId' })
    CharactersJutsu.belongsTo(models.Character, { foreignKey: 'characterId' })
  }

  return CharactersJutsu
}
