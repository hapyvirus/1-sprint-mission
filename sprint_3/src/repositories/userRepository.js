import prisma from "../config/prisma.js";

async function findById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function findByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function save(user) {
  return await prisma.user.create({
    data: {
      email: user.email,
      nickname: user.nickname,
      password: user.password,
      image: user.image,
    },
  });
}

async function update(id, data) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: data,
  });
}

async function getMyProuct({ page, pageSize, orderBy, userId }) {
  const where = {
    author: { id: userId },
  };

  const products = await prisma.product.findMany({
    where,
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true,
    },
    orderBy: orderBy === "recent" ? { createdAt: "desc" } : { id: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.product.count({ where });

  return { products, totalCount };
}

export default {
  findById,
  findByEmail,
  save,
  update,
  getMyProuct,
};
