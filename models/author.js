module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "Author",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "authors",
      timestamps: true,
    }
  );

  Author.associate = (models) => {
    Author.hasMany(models.Article, {
      foreignKey: "author_id",
      as: "articles",
    });
  };

  return Author;
};
