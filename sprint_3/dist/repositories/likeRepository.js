"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
const getLikedProducts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const likedProducts = yield prisma_1.default.like.findMany({
        where: {
            authorId: userId,
            productId: { not: null },
        },
        include: {
            product: true,
        },
    });
    return likedProducts;
});
const likeProduct = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const like = yield prisma_1.default.like.create({
        data: {
            authorId: userId,
            productId: productId,
        },
    });
    const likeCount = yield prisma_1.default.like.count({
        where: { productId: productId },
    });
    yield prisma_1.default.product.update({
        where: { id: productId },
        data: { likeCount: likeCount },
    });
});
const unLikeProduct = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const unlike = yield prisma_1.default.like.deleteMany({
        where: {
            authorId: userId,
            productId: productId,
        },
    });
    const likeCount = yield prisma_1.default.like.count({
        where: { productId: productId },
    });
    yield prisma_1.default.product.update({
        where: { id: productId },
        data: { likeCount: likeCount },
    });
});
const likeProductStatus = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const likeStatus = yield prisma_1.default.like.findFirst({
        where: {
            authorId: userId,
            productId: productId,
        },
    });
    return likeStatus !== null;
});
// export const getLikedArticles = async (userId) => {
//   return await prisma.like.findMany({
//     where: {
//       authorId: userId,
//       articleId: { not: null },
//     },
//     include: {
//       article: true,
//     },
//   });
// };
// export const getProductLikeStatus = async (userId, productId) => {
//   const like = await prisma.like.findFirst({
//     where: {
//       authorId: userId,
//       productId: productId,
//     },
//   });
//   return like !== null;
// };
// export const getArticleLikeStatus = async (userId, articleId) => {
//   const like = await prisma.like.findFirst({
//     where: {
//       authorId: userId,
//       articleId: articleId,
//     },
//   });
//   return like !== null;
// };
// export const deleteLikeProduct = async (userId, productId) => {
//   await prisma.like.deleteMany({
//     where: {
//       authorId: userId,
//       productId: productId,
//     },
//   });
// };
// export const createLikeProduct = async (userId, productId) => {
//   await prisma.like.create({
//     data: {
//       authorId: userId,
//       productId: productId,
//     },
//   });
// };
// export const deleteLikeArticle = async (userId, articleId) => {
//   await prisma.like.deleteMany({
//     where: {
//       authorId: userId,
//       articleId: articleId,
//     },
//   });
// };
// export const createLikeArticle = async (userId, articleId) => {
//   await prisma.like.create({
//     data: {
//       authorId: userId,
//       articleId: articleId,
//     },
//   });
// };
exports.default = {
    getLikedProducts,
    likeProduct,
    likeProductStatus,
    unLikeProduct,
};
