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

export default { getAll };
