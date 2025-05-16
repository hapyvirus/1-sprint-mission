"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeController_1 = require("../controllers/likeController");
const likeRoute = express_1.default.Router();
likeRoute.get("/products", likeController_1.getLikedProducts);
// // 유저가 좋아요를 선택한 게시글 목록 조회
// likeRoute.get("/articles", getLikedArticles);
// // 상품에 좋아요 추가 또는 취소
likeRoute.patch("/products/:productId", likeController_1.likeProduct);
// // 게시글에 좋아요 추가 또는 취소
// likeRoute.patch("/articles/:articleId", toggleLikeArticle);
exports.default = likeRoute;
