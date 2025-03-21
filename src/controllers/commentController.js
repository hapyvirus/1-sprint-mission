import { assert } from "superstruct";
import asyncHandler from "../middleWares/errorHandler.js";
import { CreateComment, PatchComment } from "../middleWares/structs.js";
import commentService from "../services/commentService.js";
import commentRepository from "../repositories/commentRepository.js";

export const patchComment = asyncHandler(async (req, res) => {
  assert(req.body, PatchComment);
  const comments = await commentService.update(req.params.id, req.body);
  res.status(201).send(comments);
});

export const deleteComment = asyncHandler(async (req, res) => {
  await commentService.deleteById(req.params.id);
  res.sendStatus(204);
});

export const getProductCommentDetatil = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { cursor, take = 5 } = req.query;
  const { comments, nextCursor } = await commentService.getProductId(
    productId,
    cursor,
    take
  );
  res.status(200).send({ comments, nextCursor });
});

export const createProductComment = asyncHandler(async (req, res) => {
  assert(req.body, CreateComment);

  const comment = await commentService.createProductComment(
    req.params.productId,
    req.body
  );

  res.status(201).send(comment);
});

export const getArticleCommentDetail = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { cursor, take = 5 } = req.query;
  const { comments, nextCursor } = await commentService.getArticleId(
    articleId,
    cursor,
    take
  );

  res.status(200).send({ comments, nextCursor });
});

export const creatArticleComment = asyncHandler(async (req, res) => {
  assert(req.body, CreateComment);
  const comment = await commentService.createArticleComment(
    req.params.articleId,
    req.body
  );
  res.status(201).send(comment);
});
