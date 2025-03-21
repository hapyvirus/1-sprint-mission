import prisma from "../config/prisma.js";

async function getAll({ offset, limit, orderBy, search }) {
  const products = await prisma.product.findMany({
    where: {
      OR: [{ name: { contains: search, mode: "insensitive" } }],
    },
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true,
    },
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit),
  });

  return products;
}

async function save(product) {
  const createdProduct = await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
    },
  });
  return createdProduct;
}

async function getById(id) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product;
}

async function update(id, product) {
  const updateProduct = await prisma.product.update({
    where: { id },
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
    },
  });
  return updateProduct;
}

async function deleteProduct(id) {
  const product = await prisma.product.delete({
    where: { id },
  });
  return product;
}

export default { getAll, save, getById, update, deleteProduct };
