import { assert } from "superstruct";
import { CreateComment, PatchComment } from "../middleWares/structs.js";
import commentService from "../services/commentService.js";
import { catchHandler } from "../lib/catchHandler.js";

export const patchComment = catchHandler(async (req, res) => {
  assert(req.body, PatchComment);
  const comments = await commentService.update(req.params.id, req.body);
  res.status(201).send(comments);
});

export const deleteComment = catchHandler(async (req, res) => {
  await commentService.deleteById(req.params.id);
  res.sendStatus(204);
});

export const getProductCommentDetatil = catchHandler(async (req, res) => {
  const { productId } = req.params;
  const { cursor, take = 5 } = req.query;
  const { comments, nextCursor } = await commentService.getProductId(
    productId,
    cursor,
    take
  );
  res.status(200).send({ comments, nextCursor });
});

export const createProductComment = catchHandler(async (req, res) => {
  assert(req.body, CreateComment);

  const comment = await commentService.createProductComment(
    req.params.productId,
    req.body
  );

  res.status(201).send(comment);
});

export const getArticleCommentDetail = catchHandler(async (req, res) => {
  const { articleId } = req.params;
  const { cursor, take = 5 } = req.query;
  const { comments, nextCursor } = await commentService.getArticleId(
    articleId,
    cursor,
    take
  );

  res.status(200).send({ comments, nextCursor });
});

export const creatArticleComment = catchHandler(async (req, res) => {
  assert(req.body, CreateComment);
  const comment = await commentService.createArticleComment(
    req.params.articleId,
    req.body
  );
  res.status(201).send(comment);
});
