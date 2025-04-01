import express from "express";
import {
  getArticle,
  createArticle,
  getArticleDetail,
  patchArticle,
  deleteArticle,
} from "../controllers/articleController.js";
import { verifyArticleAuth } from "../lib/tokenAuth.js";
import { catchHandler } from "../lib/catchHandler.js";

const articleRoute = express.Router();

articleRoute.get("/", catchHandler(getArticle));
articleRoute.post("/", catchHandler(createArticle));
articleRoute.get("/:id", catchHandler(getArticleDetail));
articleRoute.patch("/:id", verifyArticleAuth, catchHandler(patchArticle));
articleRoute.delete("/:id", verifyArticleAuth, catchHandler(deleteArticle));

export default articleRoute;
