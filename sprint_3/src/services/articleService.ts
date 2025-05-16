import { assert } from "superstruct";
import NotFoundError from "../lib/error/NotFoundError";
import articleRepository from "../repositories/articleRepository";

const getAll = async (
  page: number,
  pageSize: number,
  orderBy: string,
  search: string
) => {
  const articles = await articleRepository.getAll({
    page,
    pageSize,
    orderBy,
    search,
  });

  return articles;
};

const getUserAll = async (
  page: number,
  pageSize: number,
  orderBy: string,
  userId: number
) => {
  const articles = await articleRepository.getUserAll({
    page,
    pageSize,
    orderBy,
    userId,
  });

  return articles;
};

const create = async (data, authorId: number) => {
  return articleRepository.save({ ...data, authorId });
};

const getById = async (id: number) => {
  const article = await articleRepository.getById(id);

  if (!article) {
    throw new NotFoundError(id);
  }
  return article;
};

const update = async (id: number, article) => {
  const findArticle = await articleRepository.getById(id);
  if (!findArticle) {
    throw new NotFoundError(id);
  }
  return await articleRepository.update(id, article);
};

const deleteById = async (id: number) => {
  const findArticle = await articleRepository.getById(id);

  if (!findArticle) {
    throw new NotFoundError(id);
  }

  return await articleRepository.deleteById(id);
};
export default { getAll, getUserAll, create, getById, update, deleteById };
