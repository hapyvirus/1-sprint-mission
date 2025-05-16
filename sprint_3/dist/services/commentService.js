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
const NotFoundError_1 = __importDefault(require("../lib/error/NotFoundError"));
const articleRepository_1 = __importDefault(require("../repositories/articleRepository"));
const commentRepository_1 = __importDefault(require("../repositories/commentRepository"));
const productRepository_1 = __importDefault(require("../repositories/productRepository"));
const update = (id, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const findComment = yield commentRepository_1.default.getById(id);
    if (!findComment) {
        throw new NotFoundError_1.default(id);
    }
    return yield commentRepository_1.default.update(id, comment);
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findComment = yield commentRepository_1.default.getById(id);
    if (!findComment) {
        throw new NotFoundError_1.default(id);
    }
    return yield commentRepository_1.default.deleteById(id);
});
const getProductId = (productId, cursor, take, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = yield productRepository_1.default.getById(productId);
    if (!findProduct) {
        throw new NotFoundError_1.default(productId);
    }
    const commentData = yield commentRepository_1.default.getProductId(productId, cursor, take, userId);
    const comments = commentData.comments;
    const nextCursor = comments.length > 0 ? comments[comments.length - 1].id : null;
    return { comments, nextCursor };
});
const createProductComment = (productId, comment, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = yield productRepository_1.default.getById(productId);
    if (!findProduct) {
        throw new NotFoundError_1.default(productId);
    }
    const creatComment = yield commentRepository_1.default.createProductComment(productId, comment, userId);
    return creatComment;
});
const getArticleId = (id, cursor, take, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const findArticle = yield articleRepository_1.default.getById(id);
    if (!findArticle) {
        throw new NotFoundError_1.default(id);
    }
    const commentData = yield commentRepository_1.default.getArticleId(id, cursor, take, userId);
    const comments = commentData.comments;
    const nextCursor = comments.length > 0 ? comments[comments.length - 1].id : null;
    return { comments, nextCursor };
});
const createArticleComment = (articleId, comment, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const findArticle = yield articleRepository_1.default.getById(articleId);
    if (!findArticle) {
        throw new NotFoundError_1.default(articleId);
    }
    const creatComment = yield commentRepository_1.default.createArticleComment(articleId, comment, userId);
    return creatComment;
});
exports.default = {
    update,
    deleteById,
    getProductId,
    createProductComment,
    getArticleId,
    createArticleComment,
};
