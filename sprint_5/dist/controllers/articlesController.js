var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { create } from 'superstruct';
import { prismaClient } from '../lib/prismaClient.js';
import NotFoundError from '../lib/errors/NotFoundError.js';
import { IdParamsStruct } from '../structs/commonStructs.js';
import { CreateArticleBodyStruct, UpdateArticleBodyStruct, GetArticleListParamsStruct, } from '../structs/articlesStructs.js';
import { CreateCommentBodyStruct, GetCommentListParamsStruct } from '../structs/commentsStruct.js';
import UnauthorizedError from '../lib/errors/UnauthorizedError.js';
import ForbiddenError from '../lib/errors/ForbiddenError.js';
import BadRequestError from '../lib/errors/BadRequestError.js';
export const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new UnauthorizedError('Unauthorized');
    }
    const data = create(req.body, CreateArticleBodyStruct);
    const article = yield prismaClient.article.create({
        data: Object.assign(Object.assign({}, data), { userId: req.user.id }),
    });
    res.status(201).send(article);
});
export const getArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = create(req.params, IdParamsStruct);
    const article = yield prismaClient.article.findUnique({
        where: { id },
        include: {
            likes: true,
        },
    });
    if (!article) {
        throw new NotFoundError('article', id);
    }
    const articleWithLikes = Object.assign(Object.assign({}, article), { likes: undefined, likeCount: article.likes.length, isLiked: req.user ? article.likes.some((like) => { var _a; return like.userId === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); }) : false });
    res.send(articleWithLikes);
});
export const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new UnauthorizedError('Unauthorized');
    }
    const { id } = create(req.params, IdParamsStruct);
    const data = create(req.body, UpdateArticleBodyStruct);
    const existingArticle = yield prismaClient.article.findUnique({ where: { id } });
    if (!existingArticle) {
        throw new NotFoundError('article', id);
    }
    if (existingArticle.userId !== req.user.id) {
        throw new ForbiddenError('Should be the owner of the article');
    }
    const updatedArticle = yield prismaClient.article.update({ where: { id }, data });
    res.send(updatedArticle);
});
export const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new UnauthorizedError('Unauthorized');
    }
    const { id } = create(req.params, IdParamsStruct);
    const existingArticle = yield prismaClient.article.findUnique({ where: { id } });
    if (!existingArticle) {
        throw new NotFoundError('article', id);
    }
    if (existingArticle.userId !== req.user.id) {
        throw new ForbiddenError('Should be the owner of the article');
    }
    yield prismaClient.article.delete({ where: { id } });
    res.status(204).send();
});
export const getArticleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageSize, orderBy, keyword } = create(req.query, GetArticleListParamsStruct);
    const where = {
        title: keyword ? { contains: keyword } : undefined,
    };
    const totalCount = yield prismaClient.article.count({ where });
    const articles = yield prismaClient.article.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: orderBy === 'recent' ? { createdAt: 'desc' } : { id: 'asc' },
        where,
        include: {
            likes: true,
        },
    });
    const articlesWithLikes = articles.map((article) => (Object.assign(Object.assign({}, article), { likes: undefined, likeCount: article.likes.length, isLiked: req.user ? article.likes.some((like) => { var _a; return like.userId === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); }) : false })));
    res.send({
        list: articlesWithLikes,
        totalCount,
    });
});
export const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new UnauthorizedError('Unauthorized');
    }
    const { id: articleId } = create(req.params, IdParamsStruct);
    const { content } = create(req.body, CreateCommentBodyStruct);
    const existingArticle = yield prismaClient.article.findUnique({ where: { id: articleId } });
    if (!existingArticle) {
        throw new NotFoundError('article', articleId);
    }
    const createdComment = yield prismaClient.comment.create({
        data: {
            articleId,
            content,
            userId: req.user.id,
        },
    });
    res.status(201).send(createdComment);
});
export const getCommentList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: articleId } = create(req.params, IdParamsStruct);
    const { cursor, limit } = create(req.query, GetCommentListParamsStruct);
    const article = yield prismaClient.article.findUnique({ where: { id: articleId } });
    if (!article) {
        throw new NotFoundError('article', articleId);
    }
    const commentsWithCursor = yield prismaClient.comment.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        take: limit + 1,
        where: { articleId },
        orderBy: { createdAt: 'desc' },
    });
    const comments = commentsWithCursor.slice(0, limit);
    const cursorComment = commentsWithCursor[commentsWithCursor.length - 1];
    const nextCursor = cursorComment ? cursorComment.id : null;
    res.send({
        list: comments,
        nextCursor,
    });
});
export const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new UnauthorizedError('Unauthorized');
    }
    const { id: articleId } = create(req.params, IdParamsStruct);
    const existingArticle = yield prismaClient.article.findUnique({ where: { id: articleId } });
    if (!existingArticle) {
        throw new NotFoundError('article', articleId);
    }
    const existingLike = yield prismaClient.like.findFirst({
        where: { articleId, userId: req.user.id },
    });
    if (existingLike) {
        throw new BadRequestError('Already liked');
    }
    yield prismaClient.like.create({ data: { articleId, userId: req.user.id } });
    res.status(201).send();
});
export const deleteLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new UnauthorizedError('Unauthorized');
    }
    const { id: articleId } = create(req.params, IdParamsStruct);
    const existingArticle = yield prismaClient.article.findUnique({ where: { id: articleId } });
    if (!existingArticle) {
        throw new NotFoundError('article', articleId);
    }
    const existingLike = yield prismaClient.like.findFirst({
        where: { articleId, userId: req.user.id },
    });
    if (!existingLike) {
        throw new BadRequestError('Not liked');
    }
    yield prismaClient.like.delete({ where: { id: existingLike.id } });
    res.status(204).send();
});
