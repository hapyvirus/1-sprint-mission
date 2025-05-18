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
exports.updateUser = exports.getUser = exports.createRefreshToken = exports.createLogin = exports.createUser = void 0;
const userService_1 = __importDefault(require("../services/userService"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService_1.default.createUser(Object.assign({}, req.body));
    res.status(201).send(user);
});
exports.createUser = createUser;
const createLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nickname, password } = req.body;
    const user = yield userService_1.default.getUser(email, nickname, password);
    const accessToken = userService_1.default.createToken(user, "access");
    const refreshToken = userService_1.default.createToken(user, "refresh");
    yield userService_1.default.updateUser(user.id, { refreshToken });
    res.cookie("refreshToken", refreshToken, {
        path: "/token/refresh",
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
    const userId = req.user.id;
    const password = req.body;
    const user = yield userService_1.default.getUserId(userId, password);
    res.status(200).send(user);
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const data = req.body;
    const updateUser = yield userService_1.default.updateUser(userId, data);
    res.status(200).send(updateUser);
});
exports.updateUser = updateUser;
