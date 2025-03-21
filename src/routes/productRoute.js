import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductDetail,
  getProuct,
  patchProduct,
} from "../controllers/productController.js";

const productRoute = express.Router();

productRoute.get("/", getProuct);
productRoute.post("/", createProduct);
productRoute.get("/:id", getProductDetail);
productRoute.patch("/:id", patchProduct);
productRoute.delete("/:id", deleteProduct);

export default productRoute;
