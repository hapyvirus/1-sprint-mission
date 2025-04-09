import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductDetail,
  getProuct,
  patchProduct,
} from "../controllers/productController.js";

import auth from "../lib/jwtAuth.js";
import { verifyProductAuth } from "../lib/tokenAuth.js";
import { catchHandler } from "../lib/catchHandler.js";

const productRoute = express.Router();

productRoute.get("/", auth.verifyOptionalToken, catchHandler(getProuct));
productRoute.post("/", auth.verifyAccessToken, catchHandler(createProduct));
productRoute.get("/:id", catchHandler(getProductDetail));
productRoute.patch(
  "/:id",
  auth.verifyAccessToken,
  verifyProductAuth,
  catchHandler(patchProduct)
);
productRoute.delete(
  "/:id",
  auth.verifyAccessToken,
  verifyProductAuth,
  catchHandler(deleteProduct)
);

export default productRoute;
