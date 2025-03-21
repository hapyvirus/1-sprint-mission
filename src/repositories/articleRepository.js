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

export default { getAll };
