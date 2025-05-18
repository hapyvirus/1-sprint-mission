"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const jwtAuth_1 = __importDefault(require("../lib/jwtAuth"));
const catchHandler_1 = require("../lib/catchHandler");
const userRoute = express_1.default.Router();
userRoute.post("/", (0, catchHandler_1.catchHandler)(userController_1.createUser));
userRoute.post("/login", (0, catchHandler_1.catchHandler)(userController_1.createLogin));
userRoute.post("/token/refresh", jwtAuth_1.default.verifyRefreshToken, (0, catchHandler_1.catchHandler)(userController_1.createRefreshToken));
userRoute.get("/productlist", jwtAuth_1.default.verifyAccessToken, (0, catchHandler_1.catchHandler)(userController_1.getMyProduct));
userRoute.get("/:id", jwtAuth_1.default.verifyAccessToken, (0, catchHandler_1.catchHandler)(userController_1.getUser));
userRoute.patch("/:id", jwtAuth_1.default.verifyAccessToken, (0, catchHandler_1.catchHandler)(userController_1.updateUser));
exports.default = userRoute;
