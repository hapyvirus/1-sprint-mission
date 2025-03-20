import prisma from "../config/prisma.js";
import { assert } from "superstruct";
import asyncHandler from "../middleWares/errorHandler.js";
import { CreateArticle, PatchArticle } from "../middleWares/structs.js";

export const getArticle = asyncHandler(async (req, res) => {
  const { offset = 0, limit = 10, order = "newest", search = "" } = req.query;
  let orderBy;
  switch (order) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "newest":
    default:
      orderBy = { createdAt: "desc" };
  }
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit),
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
