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
exports.verifycommentAuth = exports.verifyArticleAuth = exports.verifyProductAuth = void 0;
const articleRepository_1 = __importDefault(require("../repositories/articleRepository"));
const commentRepository_1 = __importDefault(require("../repositories/commentRepository"));
const productRepository_1 = __importDefault(require("../repositories/productRepository"));
const catchHandler_1 = require("./catchHandler");
const verifyProductAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: productId } = req.params;
    const userId = req.user.userId;
    const product = yield productRepository_1.default.getById(productId);
    if (!product) {
        const error = new Error("제품을 찾을 수 없습니다.");
        error.code = 404;
        throw error;
    }
    if (product.authorId !== userId) {
        const error = new Error("Forbidden");
        error.code = 403;
        throw error;
    }
    return next();
});
exports.verifyProductAuth = verifyProductAuth;
exports.verifyArticleAuth = (0, catchHandler_1.catchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: articleId } = req.params;
    const userId = req.user.userId;
    const article = yield articleRepository_1.default.getById(articleId);
    if (!article) {
        const error = new Error("제품을 찾을 수 없습니다.");
        error.code = 404;
        throw error;
    }
    if (article.authorId !== userId) {
        const error = new Error("Forbidden");
        error.code = 403;
        throw error;
    }
    return next();
}));
exports.verifycommentAuth = (0, catchHandler_1.catchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: commentId } = req.params;
    const userId = req.user.userId;
    const comment = yield commentRepository_1.default.getById(commentId);
    if (!comment) {
        const error = new Error("제품을 찾을 수 없습니다.");
        error.code = 404;
        throw error;
    }
    if (comment.authorId !== userId) {
        const error = new Error("Forbidden");
        error.code = 403;
        throw error;
    }
    return next();
}));
