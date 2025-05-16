import { create } from "superstruct";
import commentService from "../services/commentService";
import { IdParamsStruct } from "../structs/commonStruct";
import {
  UpdateCommentBodyStuct,
  CreateCommentBodyStuct,
  GetCommentList,
} from "../structs/commentStruct";
import { RequestHandler } from "express";

export const patchComment: RequestHandler = async (req, res) => {
  const { id } = create(req.params, IdParamsStruct);
  const content = create(req.body, UpdateCommentBodyStuct);
  const comment = await commentService.update(id, content);
  res.status(201).send(comment);
};

export const deleteComment: RequestHandler = async (req, res) => {
  const { id } = create(req.params, IdParamsStruct);
  await commentService.deleteById(id);
  res.sendStatus(204);
};

export const getProductCommentDetatil: RequestHandler = async (req, res) => {
  const userId = req.user.userId;
  const { id } = create(req.params, IdParamsStruct);
  const { cursor, take } = create(req.query, GetCommentList);
  const { comments, nextCursor } = await commentService.getProductId(
    id,
    cursor,
    take,
    userId
  );
  res.status(200).send({ comments, nextCursor });
};

export const createProductComment: RequestHandler = async (req, res) => {
  const userId = req.user.userId;
  const { id } = create(req.params, IdParamsStruct);
  const content = create(req.body, CreateCommentBodyStuct);
  const comment = await commentService.createProductComment(
    id,
    content,
    userId
  );

  res.status(201).send(comment);
};

export const getArticleCommentDetail: RequestHandler = async (req, res) => {
  const userId = req.user.userId;
  const { id } = create(req.params, IdParamsStruct);
  const { cursor, take } = create(req.body, GetCommentList);
  const { comments, nextCursor } = await commentService.getArticleId(
    id,
    cursor,
    take,
    userId
  );

  res.status(200).send({ comments, nextCursor });
};

export const creatArticleComment: RequestHandler = async (req, res) => {
  const userId = req.user.userId;
  const { id } = create(req.params, IdParamsStruct);
  const content = create(req.body, CreateCommentBodyStuct);
  const comment = await commentService.createArticleComment(
    id,
    content,
    userId
  );
  res.status(201).send(comment);
};
