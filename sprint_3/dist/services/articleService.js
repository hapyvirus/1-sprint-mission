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
const getAll = (page, pageSize, orderBy, search) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield articleRepository_1.default.getAll(page, pageSize, orderBy, search);
    return articles;
});
const getUserAll = (page, pageSize, orderBy, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield articleRepository_1.default.getUserAll(page, pageSize, orderBy, userId);
    return articles;
});
const create = (data, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    return articleRepository_1.default.save(data, authorId);
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield articleRepository_1.default.getById(id);
    if (!article) {
        throw new NotFoundError_1.default("게시글");
    }
    return article;
});
const update = (id, article) => __awaiter(void 0, void 0, void 0, function* () {
    return yield articleRepository_1.default.update(id, article);
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield articleRepository_1.default.deleteById(id);
});
exports.default = { getAll, getUserAll, create, getById, update, deleteById };
