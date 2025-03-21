import { assert } from "superstruct";
import asyncHandler from "../middleWares/errorHandler.js";
import { CreateArticle, PatchArticle } from "../middleWares/structs.js";
import articleService from "../services/articleService.js";

export const getArticle = asyncHandler(async (req, res) => {
  const { offset = 0, limit = 10, order = "newest", search = "" } = req.query;
  const articles = await articleService.getAll({
    offset,
    limit,
    order,
    search,
  });
  res.status(200).send(articles);
});

export const createArticle = asyncHandler(async (req, res) => {
  assert(req.body, CreateArticle);
  const article = await articleService.create({ ...req.body });
  res.status(201).send(article);
});

export const getArticleDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await articleService.getId(id);
  res.status(200).send(article);
});

export const patchArticle = asyncHandler(async (req, res) => {
  assert(req.body, PatchArticle);
  const article = await articleService.update(req.params.id, req.body);
  res.status(201).send(article);
});

export const deleteArticle = asyncHandler(async (req, res) => {
  await articleService.deleteById(req.params.id);
  res.status(204).send({ message: "해당 게시글이 삭제 되었습니다." });
});
