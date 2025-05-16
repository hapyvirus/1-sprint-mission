"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwUnauthorizedError() {
    const error = new Error("Unauthorized");
    error.code = 401;
    throw error;
}
exports.default = throwUnauthorizedError;
