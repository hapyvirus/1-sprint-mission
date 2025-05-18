"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET 환경변수가 설정되어 있지 않습니다.");
}
const verifyAccessToken = (0, express_jwt_1.expressjwt)({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "user",
});
const verifyRefreshToken = (0, express_jwt_1.expressjwt)({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
    getToken: (req) => req.cookies.refreshToken,
    requestProperty: "user",
});
exports.default = {
    verifyAccessToken,
    verifyRefreshToken,
};
