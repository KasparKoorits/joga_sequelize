const models = require("../../models");

const createArticle = (req, res) => {
  const { name, slug, image, body } = req.body;

  models.Article.create({
    name,
    slug,
    image,
    body,
    published: new Date().toISOString().slice(0, 19).replace("T", " "),
  })
    .then((article) => {
      console.log(article);
      return res.status(200).json({ message: "New article is added" });
    })
    .catch((error) => {
      return res.status(500).send(error.message);
    });
};

const updateArticle = (req, res) => {
  if (req.method === "POST") {
    const { name, slug, image, body, published } = req.body;

    models.Article.update(
      {
        name,
        slug,
        image,
        body,
        published: new Date().toISOString().slice(0, 19).replace("T", " "),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((article) => {
        console.log(article);
        return res.status(200).json({ message: "Updated article" });
      })
      .catch((error) => {
        return res.status(500).send(error.message);
      });
  } else if (req.method === "GET") {
    models.Article.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((article) => {
        console.log(article);
        return res.status(200).json({ article });
      })
      .catch((error) => {
        return res.status(500).send(error.message);
      });
  }
};

const getAllArticles = async (req, res) => {
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
};

const getArticleBySlug = async (req, res) => {
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
};

const getArticlesByAuthor = async (req, res) => {
  try {
    const articles = await models.Article.findAll({
      where: { author_id: req.params.id },
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

    if (!articles.length) {
      return res
        .status(404)
        .json({ message: "No articles found for this author" });
    }

    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred" });
  }
};

module.exports = {
  createArticle,
  updateArticle,
  getAllArticles,
  getArticleBySlug,
  getArticlesByAuthor,
};
