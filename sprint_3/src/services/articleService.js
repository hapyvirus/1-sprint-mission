import NotFoundError from "../lib/error/NotFoundError.js";
import articleRepository from "../repositories/articleRepository.js";

async function getAll({ page, pageSize, orderBy, search }) {
  const articles = await articleRepository.getAll({
    page,
    pageSize,
    orderBy,
    search,
  });

  return articles;
}

async function getUserAll({ page, pageSize, orderBy, userId }) {
  const articles = await articleRepository.getUserAll({
    page,
    pageSize,
    orderBy,
    userId,
  });

  return articles;
}

async function create({ data, authorId }) {
  return articleRepository.save({ ...data, authorId });
}

async function getById(id) {
  const article = await articleRepository.getById(id);

  return article;
}

async function update(id, article) {
  return await articleRepository.update(id, article);
}

async function deleteById(id) {
  return await articleRepository.deleteById(id);
}
export default { getAll, getUserAll, create, getById, update, deleteById };
