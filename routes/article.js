const express = require("express");
const router = express.Router();
const articleController = require("../controllers/admin/article");

router.get("/", articleController.getAllArticles);
router.get("/article/:slug", articleController.getArticleBySlug);
router.get("/author/:id", articleController.getArticlesByAuthor);

router.post("/admin/article/create", articleController.createArticle); // Corrected path
router.all("/admin/article/edit/:id", articleController.updateArticle);

module.exports = router;
