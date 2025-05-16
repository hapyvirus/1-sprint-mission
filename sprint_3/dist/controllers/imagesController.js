"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const BadReqestError_1 = __importDefault(require("../lib/error/BadReqestError"));
const constants_1 = require("../lib/constants");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, constants_1.PUBLIC_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
        const err = new BadReqestError_1.default("이미지 파일을 업로드 해주세요.");
        return cb(err);
    }
    return cb(null, true);
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});
exports.upload = upload;
const imageUpload = (req, res) => {
    console.log(req.file);
    if (req.file) {
        const host = req.get("host");
        const filePaths = path_1.default.join(host, constants_1.STATIC_PATH, req.file.filename);
        const url = `http://${filePaths}`;
        return res.status(200).send({ url });
    }
    res.status(400).send({ message: "업로드 된 파일이 없습니다." });
};
exports.imageUpload = imageUpload;
