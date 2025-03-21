const models = require("../models");

class articleController {
  async getAllArticles(req, res) {
    try {
      const articles = await models.Article.findAll({
        include: [
          {
            model: models.Author,
            as: "Author",
          },
          {
            model: models.Tag,
            as: "Tags",
            through: { attributes: [] }, // Exclude ArticleTags from the result
          },
        ],
      });
      res.status(200).json(articles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error occurred" });
    }
  }

  async getArticleBySlug(req, res) {
    try {
      const article = await models.Article.findOne({
        where: { slug: req.params.slug },
        include: [
          {
            model: models.Author,
            as: "Author",
          },
          {
            model: models.Tag,
            as: "Tags",
            through: { attributes: [] }, // Exclude ArticleTags from the result
          },
        ],
      });

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json(article);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error occurred" });
    }
  }
}

module.exports = new articleController();
