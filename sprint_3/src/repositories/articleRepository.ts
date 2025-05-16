import prisma from "../config/prisma";
import NotFoundError from "../lib/error/NotFoundError";

const getAll = async (
  page: number,
  pageSize: number,
  orderBy: string,
  search: string
) => {
  const where = {
    AND: [
      { title: search ? { contains: search } : undefined },
      {
        content: search ? { contains: search } : undefined,
      },
    ],
  };

  const articles = await prisma.article.findMany({
    where,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
    orderBy: orderBy === "recent" ? { createdAt: "desc" } : { id: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.article.count({ where });

  return { articles, totalCount };
};

const getUserAll = async (
  page: number,
  pageSize: number,
  orderBy: string,
  userId: number
) => {
  const where = {
    author: { id: userId },
  };

  const articles = await prisma.article.findMany({
    where,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
    orderBy: orderBy === "recent" ? { createdAt: "desc" } : { id: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.article.count({ where });

  return { articles, totalCount };
};

const save = async (article: {
  title: string;
  content: string;
  authorId: number;
}) => {
  const createdArticle = await prisma.article.create({
    data: {
      title: article.title,
      content: article.content,
      author: {
        connect: {
          id: article.authorId,
        },
      },
    },
  });

  return createdArticle;
};

const getById = async (id: number) => {
  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) {
    throw new NotFoundError(id);
  }
  return article;
};

const update = async (
  id: number,
  article: { title: string; content: string }
) => {
  const updatedArticle = await prisma.article.update({
    where: { id },
    data: {
      title: article.title,
      content: article.content,
    },
  });

  if (!updatedArticle) {
    throw new NotFoundError(id);
  }
  return updatedArticle;
};

const deleteById = async (id: number) => {
  const article = await prisma.article.delete({
    where: { id },
  });

  if (!article) {
    throw new NotFoundError(id);
  }

  return article;
};

export default { getAll, getUserAll, save, getById, update, deleteById };
