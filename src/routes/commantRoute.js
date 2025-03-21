import express from "express";
import {
  creatArticleComment,
  createProductComment,
  deleteComment,
  getArticleComment,
  getArticleCommentDetail,
  getCommentDetail,
  getProductComment,
  getProductCommentDetatil,
  patchComment,
} from "../controllers/commentController.js";

const commentRoute = express.Router();

commentRoute.get("/products", getProductComment);
commentRoute.get("/articles", getArticleComment);
commentRoute.get("/:id", getCommentDetail);
commentRoute.patch("/:id", patchComment);
commentRoute.delete("/:id", deleteComment);
commentRoute.get("/products/:productId", getProductCommentDetatil);
commentRoute.post("/products/:productId", createProductComment);
commentRoute.get("/articles/:articleId", getArticleCommentDetail);
commentRoute.get("/articles/:articleId", creatArticleComment);

export default commentRoute;
