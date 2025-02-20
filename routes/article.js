const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article");

router.get("/", articleController.getAllArticles); // Muudetud getArticles → getAllArticles
router.get("/article/:slug", articleController.getArticleBySlug); // Lisatud uus route

module.exports = router;
