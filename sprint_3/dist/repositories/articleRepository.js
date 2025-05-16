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
const NotFoundError_1 = __importDefault(require("../lib/error/NotFoundError"));
const getAll = (page, pageSize, orderBy, search) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {
        AND: [
            { title: search ? { contains: search } : undefined },
            {
                content: search ? { contains: search } : undefined,
            },
        ],
    };
    const articles = yield prisma_1.default.article.findMany({
        where,
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
        },
        orderBy: orderBy === "recent" ? { createdAt: "desc" } : { id: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
    const totalCount = yield prisma_1.default.article.count({ where });
    return { articles, totalCount };
});
const getUserAll = (page, pageSize, orderBy, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {
        author: { id: userId },
    };
    const articles = yield prisma_1.default.article.findMany({
        where,
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
        },
        orderBy: orderBy === "recent" ? { createdAt: "desc" } : { id: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
    const totalCount = yield prisma_1.default.article.count({ where });
    return { articles, totalCount };
});
const save = (article) => __awaiter(void 0, void 0, void 0, function* () {
    const createdArticle = yield prisma_1.default.article.create({
        data: {
            title: article.title,
            content: article.content,
            author: {
                connect: {
                    id: article.authorId,
                },
            },
        },
    });
    return createdArticle;
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield prisma_1.default.article.findUnique({
        where: { id },
    });
    if (!article) {
        throw new NotFoundError_1.default(id);
    }
    return article;
});
const update = (id, article) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedArticle = yield prisma_1.default.article.update({
        where: { id },
        data: {
            title: article.title,
            content: article.content,
        },
    });
    if (!updatedArticle) {
        throw new NotFoundError_1.default(id);
    }
    return updatedArticle;
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield prisma_1.default.article.delete({
        where: { id },
    });
    if (!article) {
        throw new NotFoundError_1.default(id);
    }
    return article;
});
exports.default = { getAll, getUserAll, save, getById, update, deleteById };
