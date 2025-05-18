"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorParamsStruct = exports.PageParamsStruct = exports.IdParamsStruct = void 0;
const s = __importStar(require("superstruct"));
const integerString = s.coerce(s.integer(), s.string(), (value) => parseInt(value));
exports.IdParamsStruct = s.object({
    id: integerString,
});
exports.PageParamsStruct = s.object({
    page: s.defaulted(integerString, 1),
    pageSize: s.defaulted(integerString, 10),
    orderBy: s.enums(["recent"]),
    search: s.optional(s.coerce(s.string(), s.string(), (value) => value === null || value === void 0 ? void 0 : value.trim().toLowerCase())),
});
exports.CursorParamsStruct = s.object({
    cursor: s.defaulted(integerString, 0),
    take: s.defaulted(integerString, 10),
    order: s.enums(["recent"]),
    search: s.optional(s.coerce(s.string(), s.string(), (value) => value.trim().toLowerCase())),
});
