import { assert } from "superstruct";
import asyncHandler from "../middleWares/errorHandler.js";
import { CreateProduct, PatchProduct } from "../middleWares/structs.js";
import productService from "../services/productService.js";

export const getProuct = asyncHandler(async (req, res) => {
  const { offset = 0, limit = 10, order = "newest", search = "" } = req.query;
  const products = await productService.getAll({
    offset,
    limit,
    order,
    search,
  });
  res.status(200).send(products);
});

export const createProduct = asyncHandler(async (req, res) => {
  assert(req.body, CreateProduct);
  const product = await productService.createProduct({ ...req.body });
  res.status(201).send(product);
});

export const getProductDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(id);
  res.status(200).send(product);
});

export const patchProduct = asyncHandler(async (req, res) => {
  assert(req.body, PatchProduct);
  const updateProduct = await productService.update(req.params.id, req.body);
  res.status(201).send(updateProduct);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.sendStatus(204);
});
