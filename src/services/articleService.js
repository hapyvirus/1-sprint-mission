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

async function getId(id) {
  return articleRepository.getId(id);
}

async function update(id, article) {
  return articleRepository.update(id, article);
}

async function deleteById(id) {
  return articleRepository.deleteById(id);
}
export default { getAll, create, getId, update, deleteById };
