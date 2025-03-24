import prisma from "../config/prisma.js";

async function getAll({ offset, limit, orderBy, search }) {
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

  return articles;
}

async function save(article) {
  const createdArticle = await prisma.article.create({
    data: {
      title: article.title,
      content: article.content,
    },
    //   user: {
    //     connect: {
    //       id: article.userId,
    //     },
    //   },
  });

  return createdArticle;
}

async function getById(id) {
  const article = await prisma.article.findUnique({
    where: { id },
  });

  return article;
}

async function update(id, article) {
  const updatedArticle = await prisma.article.update({
    where: { id },
    data: {
      title: article.title,
      content: article.content,
    },
  });

  return updatedArticle;
}

async function deleteById(id) {
  const article = await prisma.article.delete({
    where: { id },
  });

  if (!article) {
    throw new NotFoundError(id);
  }

  return article;
}

export default { getAll, save, getById, update, deleteById };
