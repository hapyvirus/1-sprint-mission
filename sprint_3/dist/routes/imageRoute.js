"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchHandler_1 = require("../lib/catchHandler");
const imagesController_1 = require("../controllers/imagesController");
const imagesRoute = express_1.default.Router();
imagesRoute.post("/upload", imagesController_1.upload.single("image"), (0, catchHandler_1.catchHandler)(imagesController_1.imageUpload));
exports.default = imagesRoute;
