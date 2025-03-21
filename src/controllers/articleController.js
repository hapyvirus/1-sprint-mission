import prisma from "../config/prisma.js";
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
  const articles = await prisma.article.create({
    data: req.body,
  });
  res.status(201).send(articles);
});

export const getArticleDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const articles = await prisma.article.findUnique({
    where: { id },
  });
  res.status(200).send(articles);
});

export const patchArticle = asyncHandler(async (req, res) => {
  assert(req.body, PatchArticle);
  const { id } = req.params;
  const articles = await prisma.article.update({
    where: { id },
    data: req.body,
  });
  res.status(201).send(articles);
});

export const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.article.delete({
    where: { id },
  });
  res.status(204);
});
