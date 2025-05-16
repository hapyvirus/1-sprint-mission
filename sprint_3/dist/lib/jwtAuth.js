"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const verifyAccessToken = (0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "user",
});
const verifyRefreshToken = (0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    getToken: (req) => {
        const refresh = req.cookies.refreshToken;
        return refresh;
    },
});
exports.default = {
    verifyAccessToken,
    verifyRefreshToken,
};
