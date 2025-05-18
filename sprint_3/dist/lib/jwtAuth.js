"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const constants_1 = require("./constants");
const verifyAccessToken = (0, express_jwt_1.expressjwt)({
    secret: constants_1.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "user",
});
const verifyRefreshToken = (0, express_jwt_1.expressjwt)({
    secret: constants_1.JWT_SECRET,
    algorithms: ["HS256"],
    getToken: (req) => req.cookies.refreshToken,
    requestProperty: "user",
});
exports.default = {
    verifyAccessToken,
    verifyRefreshToken,
};
