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
exports.verifyCommentAuth = exports.verifyArticleAuth = exports.verifyProductAuth = void 0;
const superstruct_1 = require("superstruct");
const articleRepository_1 = __importDefault(require("../repositories/articleRepository"));
const commentRepository_1 = __importDefault(require("../repositories/commentRepository"));
const productRepository_1 = __importDefault(require("../repositories/productRepository"));
const catchHandler_1 = require("./catchHandler");
const NotFoundError_1 = __importDefault(require("./error/NotFoundError"));
const ForbiddenError_1 = __importDefault(require("./error/ForbiddenError"));
const commonStruct_1 = require("../structs/commonStruct");
const verifyProductAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const userId = req.user.id;
    const product = yield productRepository_1.default.getById(id);
    if (!product) {
        throw new NotFoundError_1.default("제품");
    }
    if (product.authorId !== userId) {
        throw new ForbiddenError_1.default("작성자 외에는 수정할 수 없습니다.");
    }
    return next();
});
exports.verifyProductAuth = verifyProductAuth;
exports.verifyArticleAuth = (0, catchHandler_1.catchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const userId = req.user.id;
    const article = yield articleRepository_1.default.getById(id);
    if (!article) {
        throw new NotFoundError_1.default("게시글");
    }
    if (article.authorId !== userId) {
        throw new ForbiddenError_1.default("작성자 외에는 수정할 수 없습니다.");
    }
    return next();
}));
exports.verifyCommentAuth = (0, catchHandler_1.catchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const userId = req.user.id;
    const comment = yield commentRepository_1.default.getById(id);
    if (!comment) {
        throw new NotFoundError_1.default("댓글");
    }
    if (comment.authorId !== userId) {
        throw new ForbiddenError_1.default("작성자 외에는 수정할 수 없습니다.");
    }
    return next();
}));
