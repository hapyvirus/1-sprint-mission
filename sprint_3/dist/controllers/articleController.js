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
exports.deleteArticle = exports.patchArticle = exports.getArticleDetail = exports.createArticle = exports.getUserArticle = exports.getArticle = void 0;
const superstruct_1 = require("superstruct");
const articleService_1 = __importDefault(require("../services/articleService"));
const articleStruct_1 = require("../structs/articleStruct");
const commonStruct_1 = require("../structs/commonStruct");
const getArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageSize, orderBy, search } = (0, superstruct_1.create)(req.query, articleStruct_1.GetArticleList);
    const articles = yield articleService_1.default.getAll({
        page,
        pageSize,
        orderBy,
        search,
    });
    res.status(200).send(articles);
});
exports.getArticle = getArticle;
const getUserArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { page = 1, pageSize = 10, orderBy } = req.query;
    const articles = yield articleService_1.default.getAll({
        page,
        pageSize,
        orderBy,
        userId,
    });
    res.status(200).send(articles);
});
exports.getUserArticle = getUserArticle;
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const data = (0, superstruct_1.create)(req.body, articleStruct_1.CreateArticleBodyStuct);
    const article = yield articleService_1.default.create({ data, authorId: userId });
    res.status(201).send(article);
});
exports.createArticle = createArticle;
const getArticleDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const article = yield articleService_1.default.getById(id);
    res.status(200).send(article);
});
exports.getArticleDetail = getArticleDetail;
const patchArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const content = (0, superstruct_1.create)(req.body, articleStruct_1.UpdateArticleBodyStuct);
    const article = yield articleService_1.default.update(id, content);
    res.status(201).send(article);
});
exports.patchArticle = patchArticle;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const article = yield articleService_1.default.deleteById(id);
    res.sendStatus(204);
});
exports.deleteArticle = deleteArticle;
