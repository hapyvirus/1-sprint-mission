import commentRepository from "../repositories/commentRepository.js";

async function update(id, comment) {
  return commentRepository.update(id, comment);
}

async function deleteById(id) {
  return commentRepository.deleteById(id);
}

async function getProductId(productId, cursor, take) {
  const commentData = await commentRepository.getProductId(
    productId,
    cursor,
    take
  );
  const comments = commentData.comments;

  const nextCursor =
    comments.length > 0 ? comments[comments.length - 1].id : null;
  return { comments, nextCursor };
}

async function createProductComment(productId, comment) {
  return commentRepository.createProductComment(productId, comment);
}

async function getArticleId(articleId, cursor, take) {
  const commentData = await commentRepository.getArticleId(
    articleId,
    cursor,
    take
  );
  const comments = commentData.comments;

  const nextCursor =
    comments.length > 0 ? comments[comments.length - 1].id : null;
  return { comments, nextCursor };
}

async function createArticleComment(articleId, comment) {
  return commentRepository.createArticleComment(articleId, comment);
}

export default {
  update,
  deleteById,
  getProductId,
  createProductComment,
  getArticleId,
  createArticleComment,
};
