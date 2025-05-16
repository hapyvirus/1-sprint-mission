"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const jwtAuth_1 = __importDefault(require("../lib/jwtAuth"));
const userRoute = express_1.default.Router();
userRoute.post("/", userController_1.creatUser);
userRoute.post("/login", userController_1.createLogin);
userRoute.post("/token/refresh", jwtAuth_1.default.verifyRefreshToken, userController_1.createRefreshToken);
userRoute.get("/:id", jwtAuth_1.default.verifyAccessToken, userController_1.getUser);
userRoute.patch("/:id", jwtAuth_1.default.verifyAccessToken, userController_1.updateUser);
exports.default = userRoute;
