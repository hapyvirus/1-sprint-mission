import prisma from "../config/prisma";

async function getLikedProducts(userId) {
  const likedProducts = await prisma.like.findMany({
    where: {
      authorId: userId,
      productId: { not: null },
    },
    include: {
      product: true,
    },
  });

  return likedProducts;
}

async function getLikedArticles(userId) {
  const likedArticles = await prisma.like.findMany({
    where: {
      authorId: userId,
      articleId: { not: null },
    },
    include: {
      product: true,
    },
  });
  return likedArticles;
}

async function likeProduct(userId, productId) {
  const like = await prisma.like.create({
    data: {
      authorId: userId,
      productId: productId,
    },
  });

  const likeCount = await prisma.like.count({
    where: { productId: productId },
  });

  await prisma.product.update({
    where: { id: productId },
    data: { likeCount: likeCount },
  });
}

async function likeArticle(userId, articleId) {
  const like = await prisma.like.create({
    data: {
      authorId: userId,
      articleId: articleId,
    },
  });
  const likeCount = await prisma.like.count({
    where: { articleId: articleId },
  });
  await prisma.article.update({
    where: { id: articleId },
    data: { likeCount: likeCount },
  });
}

async function unLikeProduct(userId, productId) {
  const unlike = await prisma.like.deleteMany({
    where: {
      authorId: userId,
      productId: productId,
    },
  });

  const likeCount = await prisma.like.count({
    where: { productId: productId },
  });

  await prisma.product.update({
    where: { id: productId },
    data: { likeCount: likeCount },
  });
}

async function unlikeArticle(userId, articleId) {
  const unlike = await prisma.like.deleteMany({
    where: {
      authorId: userId,
      articleId: articleId,
    },
  });
  const likeCount = await prisma.like.count({
    where: { articleId: articleId },
  });

  await prisma.article.update({
    where: { id: articleId },
    data: { likeCount: likeCount },
  });
}

async function likeProductStatus(userId, productId) {
  const likeStatus = await prisma.like.findFirst({
    where: {
      authorId: userId,
      productId: productId,
    },
  });

  return likeStatus !== null;
}

async function likeArticleStatus(userId, articleId) {
  const likeStatus = await prisma.like.findFirst({
    where: {
      authorId: userId,
      articleId: articleId,
    },
  });
  return likeStatus !== null;
}

export default {
  getLikedProducts,
  likeProduct,
  likeProductStatus,
  unLikeProduct,
  getLikedArticles,
  likeArticle,
  likeArticleStatus,
  unlikeArticle,
};
