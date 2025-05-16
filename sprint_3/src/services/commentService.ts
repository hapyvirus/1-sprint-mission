import NotFoundError from "../lib/error/NotFoundError";
import articleRepository from "../repositories/articleRepository";
import commentRepository from "../repositories/commentRepository";
import productRepository from "../repositories/productRepository";

const update = async (id: number, comment) => {
  const findComment = await commentRepository.getById(id);

  if (!findComment) {
    throw new NotFoundError(id);
  }
  return await commentRepository.update(id, comment);
};

const deleteById = async (id: number) => {
  const findComment = await commentRepository.getById(id);

  if (!findComment) {
    throw new NotFoundError(id);
  }

  return await commentRepository.deleteById(id);
};

const getProductId = async (
  productId: number,
  cursor: number,
  take: number,
  userId: number
) => {
  const findProduct = await productRepository.getById(productId);

  if (!findProduct) {
    throw new NotFoundError(productId);
  }

  const commentData = await commentRepository.getProductId(
    productId,
    cursor,
    take,
    userId
  );

  const comments = commentData.comments;

  const nextCursor =
    comments.length > 0 ? comments[comments.length - 1].id : null;
  return { comments, nextCursor };
};

const createProductComment = async (
  productId: number,
  comment,
  userId: number
) => {
  const findProduct = await productRepository.getById(productId);

  if (!findProduct) {
    throw new NotFoundError(productId);
  }

  const creatComment = await commentRepository.createProductComment(
    productId,
    comment,
    userId
  );

  return creatComment;
};

const getArticleId = async (
  id: number,
  cursor: number,
  take: number,
  userId: number
) => {
  const findArticle = await articleRepository.getById(id);

  if (!findArticle) {
    throw new NotFoundError(id);
  }

  const commentData = await commentRepository.getArticleId(
    id,
    cursor,
    take,
    userId
  );

  const comments = commentData.comments;

  const nextCursor =
    comments.length > 0 ? comments[comments.length - 1].id : null;
  return { comments, nextCursor };
};

const createArticleComment = async (
  articleId: number,
  comment,
  userId: number
) => {
  const findArticle = await articleRepository.getById(articleId);

  if (!findArticle) {
    throw new NotFoundError(articleId);
  }

  const creatComment = await commentRepository.createArticleComment(
    articleId,
    comment,
    userId
  );

  return creatComment;
};

export default {
  update,
  deleteById,
  getProductId,
  createProductComment,
  getArticleId,
  createArticleComment,
};
