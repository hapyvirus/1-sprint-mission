import prisma from "../config/prisma.js";

async function getById(id) {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  return comment;
}

async function update(id, comment) {
  const comments = await prisma.comment.update({
    where: { id },
    data: {
      title: comment.title,
      content: comment.content,
    },
  });

  return comments;
}

async function deleteById(id) {
  const comment = await prisma.comment.delete({
    where: { id },
  });
  return comment;
}

async function getProductId(productId, cursor, take) {
  const lastId = cursor ? cursor : null;
  const comments = await prisma.comment.findMany({
    take: parseInt(take),
    cursor: lastId ? { id: lastId } : undefined,
    orderBy: {
      id: "asc",
    },
    where: { productId },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  return { comments };
}

async function createProductComment(productId, comment) {
  const createdComment = await prisma.comment.create({
    data: {
      content: comment.content,
      product: {
        connect: { id: productId },
      },
    },
  });
  return createdComment;
}

async function getArticleId(articleId, cursor, take) {
  const lastId = cursor ? cursor : null;
  const comments = await prisma.comment.findMany({
    take: parseInt(take),
    cursor: lastId ? { id: lastId } : undefined,
    orderBy: {
      id: "asc",
    },
    where: { articleId },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  return { comments };
}

async function createArticleComment(articleId, comment) {
  const createdComment = await prisma.comment.create({
    data: {
      content: comment.content,
      article: {
        connect: { id: articleId },
      },
    },
  });
  return createdComment;
}

export default {
  getById,
  update,
  deleteById,
  getProductId,
  createProductComment,
  getArticleId,
  createArticleComment,
};
