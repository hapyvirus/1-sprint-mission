import express from "express";
import {
  creatArticleComment,
  createProductComment,
  deleteComment,
  getArticleCommentList,
  getProductCommentList,
  patchComment,
} from "../controllers/commentController";
import { verifyCommentAuth } from "../lib/tokenAuth";
import auth from "../lib/jwtAuth";
import { catchHandler } from "../lib/catchHandler";

const commentRoute = express.Router();

commentRoute.patch(
  "/:id",
  auth.verifyAccessToken,
  verifyCommentAuth,
  catchHandler(patchComment)
);
commentRoute.delete(
  "/:id",
  auth.verifyAccessToken,
  verifyCommentAuth,
  catchHandler(deleteComment)
);
commentRoute.get("/products/:id", catchHandler(getProductCommentList));
commentRoute.post(
  "/products/:id",
  auth.verifyAccessToken,
  catchHandler(createProductComment)
);
commentRoute.get("/articles/:id", catchHandler(getArticleCommentList));
commentRoute.post(
  "/articles/:id",
  auth.verifyAccessToken,
  catchHandler(creatArticleComment)
);

export default commentRoute;
