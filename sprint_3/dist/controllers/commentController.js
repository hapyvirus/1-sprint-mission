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
exports.creatArticleComment = exports.getArticleCommentList = exports.createProductComment = exports.getProductCommentList = exports.deleteComment = exports.patchComment = void 0;
const superstruct_1 = require("superstruct");
const commentService_1 = __importDefault(require("../services/commentService"));
const commonStruct_1 = require("../structs/commonStruct");
const commentStruct_1 = require("../structs/commentStruct");
const patchComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const content = (0, superstruct_1.create)(req.body, commentStruct_1.UpdateCommentBodyStruct);
    const comment = yield commentService_1.default.update(id, content);
    res.status(201).send(comment);
});
exports.patchComment = patchComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    yield commentService_1.default.deleteById(id);
    res.sendStatus(204);
});
exports.deleteComment = deleteComment;
const getProductCommentList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const { cursor, take } = (0, superstruct_1.create)(req.query, commentStruct_1.GetCommentList);
    const { comments, nextCursor } = yield commentService_1.default.getProductId(id, cursor, take, userId);
    res.status(200).send({ comments, nextCursor });
});
exports.getProductCommentList = getProductCommentList;
const createProductComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const content = (0, superstruct_1.create)(req.body, commentStruct_1.CreateCommentBodyStruct);
    const comment = yield commentService_1.default.createProductComment(id, content, userId);
    res.status(201).send(comment);
});
exports.createProductComment = createProductComment;
const getArticleCommentList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const { cursor, take } = (0, superstruct_1.create)(req.query, commentStruct_1.GetCommentList);
    const { comments, nextCursor } = yield commentService_1.default.getArticleId(id, cursor, take, userId);
    res.status(200).send({ comments, nextCursor });
});
exports.getArticleCommentList = getArticleCommentList;
const creatArticleComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const content = (0, superstruct_1.create)(req.body, commentStruct_1.CreateCommentBodyStruct);
    const comment = yield commentService_1.default.createArticleComment(id, content, userId);
    res.status(201).send(comment);
});
exports.creatArticleComment = creatArticleComment;
