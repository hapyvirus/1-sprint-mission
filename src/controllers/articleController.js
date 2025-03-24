import { assert } from "superstruct";
import { CreateArticle, PatchArticle } from "../middleWares/structs.js";
import articleService from "../services/articleService.js";
import { catchHandler } from "../lib/catchHandler.js";

export const getArticle = catchHandler(async (req, res) => {
  const { offset = 0, limit = 10, order = "newest", search = "" } = req.query;
  const articles = await articleService.getAll({
    offset,
    limit,
    order,
    search,
  });
  res.status(200).send(articles);
});

export const createArticle = catchHandler(async (req, res) => {
  assert(req.body, CreateArticle);
  const article = await articleService.create({ ...req.body });
  res.status(201).send(article);
});

export const getArticleDetail = catchHandler(async (req, res) => {
  const { id } = req.params;
  const article = await articleService.getById(id);
  res.status(200).send(article);
});

export const patchArticle = catchHandler(async (req, res) => {
  assert(req.body, PatchArticle);
  const article = await articleService.update(req.params.id, req.body);
  res.status(201).send(article);
});

export const deleteArticle = catchHandler(async (req, res) => {
  const article = await articleService.deleteById(req.params.id);
  res.sendStatus(204);
});
