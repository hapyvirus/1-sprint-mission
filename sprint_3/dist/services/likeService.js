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
const likeRepository_1 = __importDefault(require("../repositories/likeRepository"));
const getLikedProducts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const likedProducts = yield likeRepository_1.default.getLikedProducts(userId);
    return likedProducts;
});
const likeProduct = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const isLiked = yield likeRepository_1.default.likeProductStatus(userId, productId);
    if (isLiked) {
        yield likeRepository_1.default.unLikeProduct(userId, productId);
    }
    else {
        const like = yield likeRepository_1.default.likeProduct(userId, productId);
    }
});
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
exports.default = { getLikedProducts, likeProduct };
