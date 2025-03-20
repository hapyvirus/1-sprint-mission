import prisma from "../config/prisma.js";
import { assert } from "superstruct";
import asyncHandler from "../middleWares/errorHandler.js";
import { CreateProduct, PatchProduct } from "../middleWares/structs.js";

export const getProuct = asyncHandler(async (req, res) => {
  const { offset = 0, limit = 10, order = "newest", search = "" } = req.query;
  let orderBy;
  switch (order) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "newest":
    default:
      orderBy = { createdAt: "desc" };
  }
  const products = await prisma.product.findMany({
    where: {
      OR: [{ name: { contains: search, mode: "insensitive" } }],
    },
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true,
    },
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.status(200).send(products);
});

export const CreateProduct = asyncHandler(async (req, res) => {
  assert(req.body, CreateProduct);
  const product = await prisma.product.create({
    data: req.body,
  });
  res.status(201).send(product);
});

export const getProductDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const products = await prisma.product.findUnique({
    where: { id },
  });
  res.status(200).send(products);
});

export const patchProduct = asyncHandler(async (req, res) => {
  assert(req.body, PatchProduct);
  const { id } = req.params;
  const products = await prisma.product.update({
    where: { id },
    data: req.body,
  });
  res.status(201).send(products);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: { id },
  });
  res.status(204);
});


