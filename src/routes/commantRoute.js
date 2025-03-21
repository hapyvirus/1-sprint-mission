import express from "express";
import {
  creatArticleComment,
  createProductComment,
  deleteComment,
  getArticleCommentDetail,
  getProductCommentDetatil,
  patchComment,
} from "../controllers/commentController.js";

const commentRoute = express.Router();

commentRoute.patch("/:id", patchComment);
commentRoute.delete("/:id", deleteComment);
commentRoute.get("/products/:productId", getProductCommentDetatil);
commentRoute.post("/products/:productId", createProductComment);
commentRoute.get("/articles/:articleId", getArticleCommentDetail);
commentRoute.post("/articles/:articleId", creatArticleComment);

export default commentRoute;
