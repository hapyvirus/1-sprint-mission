import NotFoundError from "../lib/error/NotFoundError.js";
import productRepository from "../repositories/productRepository.js";

async function getAll({ page, pageSize, orderBy, search }) {
  const products = await productRepository.getAll({
    page,
    pageSize,
    orderBy,
    search,
  });

  return products;
}

async function getUserAll({ page, pageSize, orderBy, userId }) {
  const products = await productRepository.getUserAll({
    page,
    pageSize,
    orderBy,
    userId,
  });

  return products;
}

async function createProduct({ data, authorId }) {
  return productRepository.save({ ...data, authorId });
}

async function getById(id) {
  const product = await productRepository.getById(id);

  if (!product) {
    throw new NotFoundError(id);
  }

  return product;
}

async function update(id, product) {
  const findProduct = await productRepository.getById(id);
  if (!findProduct) {
    throw new NotFoundError(id);
  }

  return await productRepository.update(id, product);
}

async function deleteProduct(id) {
  const findProduct = await productRepository.getById(id);
  if (!findProduct) {
    throw new NotFoundError(id);
  }

  return await productRepository.deleteProduct(id);
}

export default {
  createProduct,
  getById,
  update,
  deleteProduct,
  getUserAll,
  getAll,
};
