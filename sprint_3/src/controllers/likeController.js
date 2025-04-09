import likeService from "../services/likeService.js";

export const getLikedProducts = async (req, res) => {
  const userId = req.user.userId;
  const likedProducts = await likeService.getLikedProducts(userId);
  return res.status(200).send(likedProducts);
};

export const likeProduct = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;
  await likeService.likeProduct(userId, productId);

  return res.status(201).send({ message: "🫰🏻" });
};


export const likeArticle = async (req, res) => {
  const userId = req.user.userId;
  const { articleId } = req.params;
  await likeService.likeArticle(userId, articleId);

  return res.status(201).send({ message: "🫰🏻" });
};
