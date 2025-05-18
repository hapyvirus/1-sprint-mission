"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const jwtAuth_1 = __importDefault(require("../lib/jwtAuth"));
const tokenAuth_1 = require("../lib/tokenAuth");
const productRoute = express_1.default.Router();
productRoute.get("/", jwtAuth_1.default.verifyAccessToken, productController_1.getProuct);
productRoute.post("/", jwtAuth_1.default.verifyAccessToken, productController_1.createProduct);
productRoute.get("/:id", productController_1.getProductDetail);
productRoute.patch("/:id", jwtAuth_1.default.verifyAccessToken, tokenAuth_1.verifyProductAuth, productController_1.patchProduct);
productRoute.delete("/:id", jwtAuth_1.default.verifyAccessToken, tokenAuth_1.verifyProductAuth, productController_1.deleteProduct);
exports.default = productRoute;
