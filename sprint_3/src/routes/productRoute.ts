import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductDetail,
  getProuct,
  patchProduct,
} from "../controllers/productController";

import auth from "../lib/jwtAuth";
import { verifyProductAuth } from "../lib/tokenAuth";

const productRoute = express.Router();

productRoute.get("/", auth.verifyAccessToken, getProuct);
productRoute.post("/", auth.verifyAccessToken, createProduct);
productRoute.get("/:id", getProductDetail);
productRoute.patch(
  "/:id",
  auth.verifyAccessToken,
  verifyProductAuth,
  patchProduct
);
productRoute.delete(
  "/:id",
  auth.verifyAccessToken,
  verifyProductAuth,
  deleteProduct
);

export default productRoute;
