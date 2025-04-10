import { create } from 'superstruct';
import { prismaClient } from '../lib/prismaClient.js';
import NotFoundError from '../lib/errors/NotFoundError.js';
import { IdParamsStruct } from '../structs/commonStructs.js';
import {
  CreateProductBodyStruct,
  GetProductListParamsStruct,
  UpdateProductBodyStruct,
} from '../structs/productsStruct.js';
import { CreateCommentBodyStruct, GetCommentListParamsStruct } from '../structs/commentsStruct.js';
import UnauthorizedError from '../lib/errors/UnauthorizedError.js';
import ForbiddenError from '../lib/errors/ForbiddenError.js';
import BadRequestError from '../lib/errors/BadRequestError.js';
import { RequestHandler } from 'express';

export const createProduct: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }

  const data = create(req.body, CreateProductBodyStruct);

  const createdProduct = await prismaClient.product.create({
    data: {
      ...data,
      userId: req.user.id,
    },
  });

  res.status(201).send(createdProduct);
};

export const getProduct: RequestHandler = async (req, res) => {
  const { id } = create(req.params, IdParamsStruct);

  const product = await prismaClient.product.findUnique({
    where: { id },
    include: { favorites: true },
  });
  if (!product) {
    throw new NotFoundError('product', id);
  }

  const productWithFavorites = {
    ...product,
    favorites: undefined,
    favoriteCount: product.favorites.length,
    isFavorited: req.user
      ? product.favorites.some((favorite) => favorite.userId === req.user?.id)
      : undefined,
  };

  res.send(productWithFavorites);
};

export const updateProduct: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }

  const { id } = create(req.params, IdParamsStruct);
  const { name, description, price, tags, images } = create(req.body, UpdateProductBodyStruct);

  const existingProduct = await prismaClient.product.findUnique({ where: { id } });
  if (!existingProduct) {
    throw new NotFoundError('product', id);
  }

  if (existingProduct.userId !== req.user.id) {
    throw new ForbiddenError('Should be the owner of the product');
  }

  const updatedProduct = await prismaClient.product.update({
    where: { id },
    data: { name, description, price, tags, images },
  });

  res.send(updatedProduct);
};

export const deleteProduct: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }

  const { id } = create(req.params, IdParamsStruct);
  const existingProduct = await prismaClient.product.findUnique({ where: { id } });

  if (!existingProduct) {
    throw new NotFoundError('product', id);
  }

  if (existingProduct.userId !== req.user.id) {
    throw new ForbiddenError('Should be the owner of the product');
  }

  await prismaClient.product.delete({ where: { id } });
  res.status(204).send();
};

export const getProductList: RequestHandler = async (req, res) => {
  const { page, pageSize, orderBy, keyword } = create(req.query, GetProductListParamsStruct);

  const where = keyword
    ? {
        OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
      }
    : undefined;

  const totalCount = await prismaClient.product.count({ where });
  const products = await prismaClient.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: orderBy === 'recent' ? { id: 'desc' } : { id: 'asc' },
    where,
    include: {
      favorites: true,
    },
  });

  const productsWithFavorites = products.map((product) => ({
    ...product,
    favorites: undefined,
    favoriteCount: product.favorites.length,
    isFavorited: req.user
      ? product.favorites.some((favorite) => favorite.userId === req.user?.id)
      : undefined,
  }));

  res.send({
    list: productsWithFavorites,
    totalCount,
  });
};

export const createComment: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }

  const { id: productId } = create(req.params, IdParamsStruct);
  const { content } = create(req.body, CreateCommentBodyStruct);

  const existingProduct = await prismaClient.product.findUnique({ where: { id: productId } });
  if (!existingProduct) {
    throw new NotFoundError('product', productId);
  }

  const createdComment = await prismaClient.comment.create({
    data: { productId, content, userId: req.user.id },
  });

  res.status(201).send(createdComment);
};

export const getCommentList: RequestHandler = async (req, res) => {
  const { id: productId } = create(req.params, IdParamsStruct);
  const { cursor, limit } = create(req.query, GetCommentListParamsStruct);

  const existingProduct = await prismaClient.product.findUnique({ where: { id: productId } });
  if (!existingProduct) {
    throw new NotFoundError('product', productId);
  }

  const commentsWithCursorComment = await prismaClient.comment.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: limit + 1,
    where: { productId },
  });
  const comments = commentsWithCursorComment.slice(0, limit);
  const cursorComment = commentsWithCursorComment[comments.length - 1];
  const nextCursor = cursorComment ? cursorComment.id : null;

  res.send({
    list: comments,
    nextCursor,
  });
};

export const createFavorite: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }

  const { id: productId } = create(req.params, IdParamsStruct);

  const existingProduct = await prismaClient.product.findUnique({ where: { id: productId } });
  if (!existingProduct) {
    throw new NotFoundError('product', productId);
  }

  const existingFavorite = await prismaClient.favorite.findFirst({
    where: { productId, userId: req.user.id },
  });
  if (existingFavorite) {
    throw new BadRequestError('Already favorited');
  }

  await prismaClient.favorite.create({ data: { productId, userId: req.user.id } });
  res.status(201).send();
};

export const deleteFavorite: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }

  const { id: productId } = create(req.params, IdParamsStruct);

  const existingFavorite = await prismaClient.favorite.findFirst({
    where: { productId, userId: req.user.id },
  });
  if (!existingFavorite) {
    throw new BadRequestError('Not favorited');
  }

  await prismaClient.favorite.delete({ where: { id: existingFavorite.id } });
  res.status(204).send();
};
