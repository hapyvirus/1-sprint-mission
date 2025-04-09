import likeRepository from "../repositories/likeRepository.js";

async function getLikedProducts(userId) {
  const likedProducts = await likeRepository.getLikedProducts(userId);
  return likedProducts;
}

async function likeProduct(userId, productId) {
  const isLiked = await likeRepository.likeProductStatus(userId, productId);

  if (isLiked) {
    await likeRepository.unLikeProduct(userId, productId);
  } else {
    const like = await likeRepository.likeProduct(userId, productId);
  }
}

async function getLikedArticles(userId) {
  const likeArticles = await likeRepository.getLikedProducts(userId);
  return likeArticles;
}

async function likeArticle(userId, articleId) {
  const isLiked = await likeRepository.likeArticleStatus(userId, articleId);

  if (isLiked) {
    await likeRepository.unlikeArticle(userId, articleId);
  } else {
    const like = await likeRepository.likeArticle(userId, articleId);
  }
}

export default { getLikedProducts, likeProduct, getLikedArticles, likeArticle };
