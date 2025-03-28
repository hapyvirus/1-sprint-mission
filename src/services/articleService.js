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

async function create(article) {
  return articleRepository.save(article);
}

async function getById(id) {
  const article = await articleRepository.getById(id);

  if (!article) {
    throw new NotFoundError(id);
  }
  return article;
}

async function update(id, article) {
  const findArticle = await articleRepository.getById(id);
  if (!findArticle) {
    throw new NotFoundError(id);
  }
  return await articleRepository.update(id, article);
}

async function deleteById(id) {
  const findArticle = await articleRepository.getById(id);

  if (!findArticle) {
    throw new NotFoundError(id);
  }

  return await articleRepository.deleteById(id);
}
export default { getAll, create, getById, update, deleteById };
