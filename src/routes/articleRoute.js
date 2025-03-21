import express from "express";
import {
  getArticle,
  createArticle,
  getArticleDetail,
  patchArticle,
  deleteArticle,
} from "../controllers/articleController.js";

const articleRoute = express.Router();

articleRoute.get("/", getArticle);
articleRoute.post("/", createArticle);
articleRoute.get("/:id", getArticleDetail);
articleRoute.patch("/:id", patchArticle);
articleRoute.delete("/:id", deleteArticle);

export default articleRoute;
