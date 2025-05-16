import prisma from "../config/prisma.js";
import likeRepository from "./likeRepository.js";

const getAll = async (
  page: number,
  pageSize: number,
  orderBy: string,
  search: string,
  userId: number
) => {
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
    orderBy: orderBy === "recent" ? { createdAt: "dest" } : { id: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const likeStatus = await Promise.all(
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

  const totalCount = await prisma.product.count({ where });

  return { products: likeStatus, totalCount };
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

  const products = await prisma.product.findMany({
    where,
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true,
    },
    orderBy: orderBy === "recent" ? { createdAt: "dest" } : { id: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.product.count({ where });

  return { products, totalCount };
};

const save = async (product) => {
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
};

const getById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product;
};

const update = async (id: number, product) => {
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
};

const deleteProduct = async (id: number) => {
  const product = await prisma.product.delete({
    where: { id },
  });
  return product;
};

export default { save, getById, update, deleteProduct, getUserAll, getAll };
