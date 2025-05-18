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
const likeRepository_1 = __importDefault(require("./likeRepository"));
const getAll = (page, pageSize, orderBy, userId, search) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {
        name: search ? { contains: search } : undefined,
    };
    const products = yield prisma_1.default.product.findMany({
        where,
        select: {
            id: true,
            name: true,
            price: true,
            createdAt: true,
        },
        orderBy: orderBy === "recent" ? { createdAt: "desc" } : { id: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
    const likeStatus = yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
        const likeProduct = yield likeRepository_1.default.likeProductStatus(userId, product.id);
        return Object.assign(Object.assign({}, product), { isLiked: likeProduct });
    })));
    const totalCount = yield prisma_1.default.product.count({ where });
    return { products: likeStatus, totalCount };
});
const getUserAll = (page, pageSize, orderBy, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {
        author: { id: userId },
    };
    const products = yield prisma_1.default.product.findMany({
        where,
        select: {
            id: true,
            name: true,
            price: true,
            createdAt: true,
        },
        orderBy: orderBy === "recent" ? { createdAt: "desc" } : { id: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
    const totalCount = yield prisma_1.default.product.count({ where });
    return { products, totalCount };
});
const save = (data, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const createdProduct = yield prisma_1.default.product.create({
        data: Object.assign(Object.assign({}, data), { author: {
                connect: { id: authorId },
            } }),
    });
    return createdProduct;
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.default.product.findUnique({
        where: { id },
    });
    return product;
});
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updateProduct = yield prisma_1.default.product.update({
        where: { id },
        data,
    });
    return updateProduct;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.default.product.delete({
        where: { id },
    });
    return product;
});
exports.default = { save, getById, update, deleteProduct, getUserAll, getAll };
