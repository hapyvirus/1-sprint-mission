var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PUBLIC_PATH, STATIC_PATH } from '../lib/constants.js';
import BadRequestError from '../lib/errors/BadRequestError.js';
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
export const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, PUBLIC_PATH);
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const filename = `${uuidv4()}${ext}`;
            cb(null, filename);
        },
    }),
    limits: {
        fileSize: FILE_SIZE_LIMIT,
    },
    fileFilter: function (req, file, cb) {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            const err = new BadRequestError('Only png, jpeg, and jpg are allowed');
            return cb(err);
        }
        cb(null, true);
    },
});
export const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const host = req.get('host');
    if (!host) {
        res.status(400).send({ message: 'Host header is missing' });
    }
    if (!req.file) {
        res.status(400).send({ message: 'No file uploaded' });
    }
    const protocol = req.protocol || 'http';
    const url = `${protocol}://${host}/${STATIC_PATH}/${req.file.filename}`;
    res.send({ url });
});
