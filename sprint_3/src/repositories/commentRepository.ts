import prisma from "../config/prisma.js";

const getById = async (id: number) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  return comment;
};

const update = async (
  id: number,
  comment: { title: string; content: string }
) => {
  const comments = await prisma.comment.update({
    where: { id },
    data: {
      title: comment.title,
      content: comment.content,
    },
  });

  return comments;
};

const deleteById = async (id: number) => {
  const comment = await prisma.comment.delete({
    where: { id },
  });
  return comment;
};

const getProductId = async (
  productId: number,
  cursor: number,
  take: number,
  userId: number
) => {
  const lastId = cursor ? cursor : null;
  const comments = await prisma.comment.findMany({
    take: parseInt(take),
    cursor: lastId ? { id: lastId } : undefined,
    orderBy: {
      createdAt: "desc",
    },
    where: { productId, AND: { author: { id: userId } } },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  return { comments };
};

const createProductComment = async (
  id: number,
  comment: string,
  userId: number
) => {
  const createdComment = await prisma.comment.create({
    data: {
      content: comment.content,
      product: {
        connect: { id },
      },
      author: {
        connect: { id: userId },
      },
    },
  });
  return createdComment;
};

const getArticleId = async (
  articleId: number,
  cursor: number,
  take: number,
  userId: number
) => {
  const lastId = cursor ? cursor : null;
  const comments = await prisma.comment.findMany({
    take: parseInt(take),
    cursor: lastId ? { id: lastId } : undefined,
    orderBy: {
      createdAt: "desc",
    },
    where: { articleId, AND: { author: { id: userId } } },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  return { comments };
};

const createArticleComment = async (
  id: number,
  comment: string,
  userId: number
) => {
  const createdComment = await prisma.comment.create({
    data: {
      content: comment.content,
      article: {
        connect: { id },
      },
      author: {
        connect: { id: userId },
      },
    },
  });
  return createdComment;
};

export default {
  getById,
  update,
  deleteById,
  getProductId,
  createProductComment,
  getArticleId,
  createArticleComment,
};
