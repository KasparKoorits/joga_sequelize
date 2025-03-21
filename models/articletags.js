"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ArticleTags extends Model {
    static associate(models) {
      this.belongsTo(models.Tag, {
        foreignKey: "tagId",
      });
      this.belongsTo(models.Article, {
        foreignKey: "articleId",
      });
    }
  }
  ArticleTags.init(
    {
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Articles",
          key: "id",
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tags",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ArticleTags",
    }
  );
  return ArticleTags;
};
