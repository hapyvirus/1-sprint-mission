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
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield prisma_1.default.comment.findUnique({
        where: { id },
    });
    return comment;
});
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield prisma_1.default.comment.update({
        where: { id },
        data,
    });
    return comments;
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield prisma_1.default.comment.delete({
        where: { id },
    });
    return comment;
});
const getProductId = (productId, cursor, take, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const lastId = cursor ? cursor : null;
    const comments = yield prisma_1.default.comment.findMany({
        take: take,
        cursor: lastId ? { id: lastId } : undefined,
        orderBy: {
            createdAt: "desc",
        },
        where: { productId, AND: { author: { id: userId } } },
        select: {
            id: true,
            content: true,
            createdAt: true,
        },
    });
    return { comments };
});
const createProductComment = (id, data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const createdComment = yield prisma_1.default.comment.create({
        data: Object.assign(Object.assign({}, data), { product: {
                connect: { id },
            }, author: {
                connect: { id: userId },
            } }),
    });
    return createdComment;
});
const getArticleId = (articleId, cursor, take, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const lastId = cursor ? cursor : null;
    const comments = yield prisma_1.default.comment.findMany({
        take: take,
        cursor: lastId ? { id: lastId } : undefined,
        orderBy: {
            createdAt: "desc",
        },
        where: { articleId, AND: { author: { id: userId } } },
        select: {
            id: true,
            content: true,
            createdAt: true,
        },
    });
    return { comments };
});
const createArticleComment = (id, data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const createdComment = yield prisma_1.default.comment.create({
        data: Object.assign(Object.assign({}, data), { article: {
                connect: { id },
            }, author: {
                connect: { id: userId },
            } }),
    });
    return createdComment;
});
exports.default = {
    getById,
    update,
    deleteById,
    getProductId,
    createProductComment,
    getArticleId,
    createArticleComment,
};
