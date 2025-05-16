import NotFoundError from "../lib/error/NotFoundError";
import productRepository from "../repositories/productRepository";

const getAll = async (
  page: number,
  pageSize: number,
  orderBy: string,
  search: string,
  userId: number
) => {
  const products = await productRepository.getAll({
    page,
    pageSize,
    orderBy,
    search,
    userId,
  });

  return products;
};

const getUserAll = async (
  page: number,
  pageSize: number,
  orderBy: string,
  userId: number
) => {
  const products = await productRepository.getUserAll({
    page,
    pageSize,
    orderBy,
    userId,
  });

  return products;
};

const createProduct = async (data, authorId: number) => {
  return productRepository.save({ ...data, authorId });
};

async function getById(id) {
  const product = await productRepository.getById(id);

  if (!product) {
    throw new NotFoundError(id);
  }

  return product;
}

const update = async (id: number, product) => {
  const findProduct = await productRepository.getById(id);
  if (!findProduct) {
    throw new NotFoundError(id);
  }

  return await productRepository.update(id, product);
};

const deleteProduct = async (id: number) => {
  const findProduct = await productRepository.getById(id);
  if (!findProduct) {
    throw new NotFoundError(id);
  }

  return await productRepository.deleteProduct(id);
};

export default {
  createProduct,
  getById,
  update,
  deleteProduct,
  getUserAll,
  getAll,
};
