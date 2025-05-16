import likeRepository from "../repositories/likeRepository";

const getLikedProducts = async (userId: number) => {
  const likedProducts = await likeRepository.getLikedProducts(userId);
  return likedProducts;
};

const likeProduct = async (userId: number, productId: number) => {
  const isLiked = await likeRepository.likeProductStatus(userId, productId);

  if (isLiked) {
    await likeRepository.unLikeProduct(userId, productId);
  } else {
    const like = await likeRepository.likeProduct(userId, productId);
  }
};

// export const getLikedArticles = async (userId) => {
//   const likedArticles = await likeRepository.getLikedArticles(userId);
//   return likedArticles.map((like) => like.article);
// };

// export const toggleLikeProduct = async (userId, productId) => {
//   const isLiked = await likeRepository.getProductLikeStatus(userId, productId);

//   if (isLiked) {
//     await likeRepository.deleteLikeProduct(userId, productId);
//   } else {
//     await likeRepository.createLikeProduct(userId, productId);
//   }
// };

// export const toggleLikeArticle = async (userId, articleId) => {
//   const isLiked = await likeRepository.getArticleLikeStatus(userId, articleId);
//   if (isLiked) {
//     await likeRepository.deleteLikeArticle(userId, articleId);
//   } else {
//     await likeRepository.createLikeArticle(userId, articleId);
//   }
// };

export default { getLikedProducts, likeProduct };
