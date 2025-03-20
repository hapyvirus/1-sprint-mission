import express from "express";
import {
  creatArticleComment,
  createProductComment,
  getArticleComment,
  getArticleCommentDetail,
  getCommentDetail,
  getProductComment,
  getProductCommentDetatil,
  patchComment,
} from "../controllers/commentController";
import { deleteArticle } from "../controllers/articleController";

const commentRoute = express.Router();

commentRoute.get("/products", getProductComment);
commentRoute.get("/articles", getArticleComment);
commentRoute.get("/:id", getCommentDetail);
commentRoute.patch("/:id", patchComment);
commentRoute.delete("/:id", deleteArticle);
commentRoute.get("/products/:productId", getProductCommentDetatil)
commentRoute.post("/products/:productId", createProductComment)
commentRoute.get("/articles/:articleId", getArticleCommentDetail)
commentRoute.get("/articles/:articleId", creatArticleComment)

export default commentRoute;
