import prisma from "../config/prisma";
import likeRepository from "./likeRepository";

async function getAll({ page, pageSize, orderBy, search, userId }) {
  const where = {
    name: { contains: search, mode: "insensitive" },
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

  let enhancedProducts = products;

  if (userId) {
    enhancedProducts = await Promise.all(
      products.map(async (product) => {
        const likeProduct = await likeRepository.likeProductStatus(
          userId,
          product.id
        );
        return {
          ...product,
          isLiked: likeProduct,
        };
      })
    );
  } else {
    enhancedProducts = products.map((product) => ({
      ...product,
      isLiked: false,
    }));
  }

  return {
    items: enhancedProducts,
    total: await prisma.product.count({ where }),
    page,
    pageSize,
  };
}

async function save(product) {
  const createdProduct = await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      author: {
        connect: { id: product.authorId },
      },
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

export default { save, getById, update, deleteProduct, getAll };
