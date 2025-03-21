import productRepository from "../repositories/productRepository.js";

async function getAll({ offset, limit, order, search }) {
  let orderBy;
  switch (order) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "newest":
    default:
      orderBy = { createdAt: "desc" };
  }
  const products = await productRepository.getAll({
    offset,
    limit,
    orderBy,
    search,
  });

  return products;
}

async function createProduct(product) {
  return productRepository.save(product);
}

async function getById(id) {
  return productRepository.getById(id);
}

async function update(id, product) {
  return productRepository.update(id, product);
}

async function deleteProduct(id) {
  return productRepository.deleteProduct(id);
}

export default { getAll, createProduct, getById, update, deleteProduct };
