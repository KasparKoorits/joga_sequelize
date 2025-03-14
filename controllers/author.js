const models = require("../models");

class authorController {
  async getAuthorById(req, res) {
    try {
      const author = await models.Author.findByPk(req.params.id, {
        include: [
          {
            model: models.Article,
            as: "articles",
          },
        ],
      });

      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }

      res.status(200).json(author);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error occurred" });
    }
  }
}

module.exports = authorController;
