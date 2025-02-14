// get connection to database ORM object
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:3306/joga_sequelize");

// read model data
const Article = require("../models/article")(sequelize, Sequelize.DataTypes);

// get all data
const getAllArticles = async (req, res) => {
  Article.findAll()
    .then((articles) => {
      console.log(articles);
      return res.status(200).json(articles);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Error occurred" });
    });
};

// export controller
module.exports = {
  getAllArticles, // Veendu, et route fail kasutab õiget nime
};
