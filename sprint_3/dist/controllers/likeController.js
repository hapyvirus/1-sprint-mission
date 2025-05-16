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
exports.likeProduct = exports.getLikedProducts = void 0;
const likeService_1 = __importDefault(require("../services/likeService"));
const getLikedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const likedProducts = yield likeService_1.default.getLikedProducts(userId);
    return res.status(200).send(likedProducts);
});
exports.getLikedProducts = getLikedProducts;
const likeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { productId } = req.params;
    yield likeService_1.default.likeProduct(userId, productId);
    return res.status(201).send({ message: "🫰🏻" });
});
exports.likeProduct = likeProduct;
// // 유저가 좋아요를 선택한 게시글 목록 조회
// export const getLikedArticles = async (req, res) => {
//   const userId = req.user.userId;
//   const likedArticles = await likeService.getLikedArticles(userId);
//   return res.status(200).send(likedArticles);
// };
// // 상품에 좋아요 추가 또는 취소
// export const toggleLikeProduct = async (req, res) => {
//   const userId = req.user.userId;
//   const { productId } = req.params;
//   await likeService.toggleLikeProduct(userId, productId);
//   return res.status(200).send({ message: "좋아요 상태가 변경되었습니다." });
// };
// // 게시글에 좋아요 추가 또는 취소
// export const toggleLikeArticle = async (req, res) => {
//   const userId = req.user.userId;
//   const { articleId } = req.params;
//   await likeService.toggleLikeArticle(userId, articleId);
//   return res.status(200).send({ message: "좋아요 상태가 변경되었습니다." });
// };
