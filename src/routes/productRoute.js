import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductDetail,
  getProuct,
  patchProduct,
} from "../controllers/productController.js";
import auth from "../lib/jwtAuth.js";
import { verifyProductAuth, verifyTokenLogin } from "../lib/tokenAuth.js";

const productRoute = express.Router();

productRoute.get("/", auth.verifyAccessToken, getProuct);
productRoute.post("/", auth.verifyAccessToken, verifyTokenLogin, createProduct);
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
