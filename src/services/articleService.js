import NotFoundError from "../lib/error/NotFoundError.js";
import articleRepository from "../repositories/articleRepository.js";

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

  const articles = await articleRepository.getAll({
    offset,
    limit,
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
