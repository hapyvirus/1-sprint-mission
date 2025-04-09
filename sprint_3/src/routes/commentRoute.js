import express from "express";
import {
  creatArticleComment,
  createProductComment,
  deleteComment,
  getArticleCommentList,
  getProductCommentList,
  patchComment,
} from "../controllers/commentController.js";
import { verifyCommentAuth } from "../lib/tokenAuth.js";
import auth from "../lib/jwtAuth.js";
import { catchHandler } from "../lib/catchHandler.js";

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
