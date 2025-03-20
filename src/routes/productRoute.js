import express from "express";
import {
  CreateProduct,
  deleteProduct,
  getProductDetail,
  getProuct,
  patchProduct,
} from "../controllers/productController";

const productRoute = express.Router();

productRoute.get("/", getProuct);
productRoute.post("/", CreateProduct);
productRoute.get("/:id", getProductDetail);
productRoute.patch("/:id", patchProduct);
productRoute.delete("/:id", deleteProduct);

export default productRoute;
