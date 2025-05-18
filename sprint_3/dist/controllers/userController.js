"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyProduct = exports.updateUser = exports.getUser = exports.createRefreshToken = exports.createLogin = exports.createUser = void 0;
const userService_1 = __importDefault(require("../services/userService"));
const UnauthorizedError_1 = __importDefault(require("../lib/error/UnauthorizedError"));
const userStruct_1 = require("../structs/userStruct");
const superstruct_1 = require("superstruct");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, superstruct_1.create)(req.body, userStruct_1.CreateUserBodyStruct);
    const user = yield userService_1.default.createUser(Object.assign({}, data));
    res.status(201).send(user);
});
exports.createUser = createUser;
const createLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userService_1.default.getUser(email, password);
    const accessToken = userService_1.default.createToken(user, "access");
    const refreshToken = userService_1.default.createToken(user, "refresh");
    yield userService_1.default.updateUser(user.id, { refreshToken });
    res.cookie("refreshToken", refreshToken, {
        path: "/users/token/refresh",
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    res.json({ accessToken });
});
exports.createLogin = createLogin;
const createRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const userId = req.user.id;
    if (!userId) {
        throw new UnauthorizedError_1.default();
    }
    const { accessToken, newRefreshToken } = yield userService_1.default.refreshToken(userId, refreshToken);
    yield userService_1.default.updateUser(userId, { refreshToken: newRefreshToken });
    res.cookie("refreshToken", newRefreshToken, {
        path: "/users/token/refresh",
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    res.json({ accessToken });
});
exports.createRefreshToken = createRefreshToken;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    const userId = req.user.id;
    if (!userId) {
        throw new UnauthorizedError_1.default();
    }
    const { password } = req.body;
    const user = yield userService_1.default.getUserId(userId, password);
    res.status(200).send(user);
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (!userId) {
        throw new UnauthorizedError_1.default();
    }
    const data = (0, superstruct_1.create)(req.body, userStruct_1.UpdateUserBodyStruct);
    const updateUser = yield userService_1.default.updateUser(userId, data);
    res.status(200).send(updateUser);
});
exports.updateUser = updateUser;
const getMyProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (!userId) {
        throw new UnauthorizedError_1.default();
    }
    const user = yield userService_1.default.getMyProduct(userId);
    res.status(200).send(user);
});
exports.getMyProduct = getMyProduct;
