"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeController_1 = require("../controllers/likeController");
const jwtAuth_1 = __importDefault(require("../lib/jwtAuth"));
const likeRoute = express_1.default.Router();
likeRoute.get("/products", jwtAuth_1.default.verifyAccessToken, likeController_1.getLikedProducts);
likeRoute.patch("/products/:productId", jwtAuth_1.default.verifyAccessToken, likeController_1.likeProduct);
exports.default = likeRoute;
