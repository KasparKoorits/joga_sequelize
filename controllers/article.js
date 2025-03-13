// get connection to database ORM object
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:3306/joga_sequelize");

// read model data
const Article = require("../models/article")(sequelize, Sequelize.DataTypes);

// read model data for table representation
const models = require("../models");

// get all data
const getAllArticles = async (req, res) => {
  models.Article.findAll()
    .then((articles) => {
      console.log(articles);
      return res.status(200).json(articles);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Error occurred" });
    });
};

// get article by slug
const getArticleBySlug = async (req, res) => {
  models.Article.findOne({
    where: { slug: req.params.slug },
    include: [
      {
        model: models.Author,
      },
    ],
  })
    .then((article) => {
      console.log(article);
      return res.status(200).json(article);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Error occurred" });
    });
};

// export controller
module.exports = {
  getAllArticles,
  getArticleBySlug,
};
