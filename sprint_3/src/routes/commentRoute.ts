import express from "express";
import {
  creatArticleComment,
  createProductComment,
  deleteComment,
  getProductCommentList,
  getArticleCommentList,
  patchComment,
} from "../controllers/commentController";
import auth from "../lib/jwtAuth";
import { verifyCommentAuth } from "../lib/tokenAuth";

const commentRoute = express.Router();

commentRoute.patch("/:id", verifyCommentAuth, patchComment);
commentRoute.delete("/:id", verifyCommentAuth, deleteComment);
commentRoute.get("/products/:id", getProductCommentList);
commentRoute.post(
  "/products/:id",
  auth.verifyAccessToken,
  createProductComment
);
commentRoute.get("/articles/:id", getArticleCommentList);
commentRoute.post("/articles/:id", auth.verifyAccessToken, creatArticleComment);

export default commentRoute;
