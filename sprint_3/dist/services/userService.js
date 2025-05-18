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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const NotFoundError_1 = __importDefault(require("../lib/error/NotFoundError"));
const UnauthorizedError_1 = __importDefault(require("../lib/error/UnauthorizedError"));
const ForbiddenError_1 = __importDefault(require("../lib/error/ForbiddenError"));
const BadReqestError_1 = __importDefault(require("../lib/error/BadReqestError"));
const hashingPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.hash(password, 10);
});
function filterSensitiveUserData(user) {
    const { password, refreshToken } = user, rest = __rest(user, ["password", "refreshToken"]);
    return rest;
}
const verifyPassword = (inputPassword, password) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield bcrypt_1.default.compare(inputPassword, password);
    if (!isMatch) {
        throw new ForbiddenError_1.default("아이디 혹은 비밀번호를 확인해주세요");
    }
});
function createToken(user, type) {
    const payload = { userId: user.id };
    const expiresIn = type === "refresh" ? "14d" : "1h";
    if (!process.env.JWT_SECRET) {
        throw new BadReqestError_1.default("JWT_SECRET");
    }
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn });
}
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield userRepository_1.default.findByEmail(user.email);
    if (existedUser) {
        throw new BadReqestError_1.default("이미 가입된 이메일입니다.");
    }
    const hashedPassword = yield hashingPassword(user.password);
    const createdUser = yield userRepository_1.default.save(Object.assign(Object.assign({}, user), { password: hashedPassword }));
    return filterSensitiveUserData(createdUser);
});
const getUser = (email, nickname, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.default.findByEmail(email);
    if (!user) {
        throw new NotFoundError_1.default("유저");
    }
    if (user.nickname !== nickname) {
        throw new NotFoundError_1.default("유저");
    }
    yield verifyPassword(password, user.password);
    return filterSensitiveUserData(user);
});
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const dataToUpdate = Object.assign({}, data);
    if (dataToUpdate.password) {
        const hashedPassword = yield hashingPassword(dataToUpdate.password);
        dataToUpdate.password = hashedPassword;
    }
    const updateUser = yield userRepository_1.default.update(id, dataToUpdate);
    return filterSensitiveUserData(updateUser);
});
const getUserId = (userId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.default.findById(userId);
    if (!user) {
        throw new NotFoundError_1.default("유저");
    }
    if (user.password !== password) {
        throw new ForbiddenError_1.default("비밀번호흘 다시 확인해주세요.");
    }
    return filterSensitiveUserData(user);
});
const refreshToken = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.default.findById(userId);
    if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedError_1.default();
    }
    const accessToken = createToken(user, "access");
    const newRefreshToken = createToken(user, "refresh");
    return { accessToken, newRefreshToken };
});
exports.default = {
    createUser,
    getUser,
    updateUser,
    refreshToken,
    createToken,
    getUserId,
};
