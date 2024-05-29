"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validaToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        try {
            const token = headerToken.slice(7);
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'pepito');
            req.body = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token invalid'
            });
        }
    }
    else {
        return res.status(401).json({
            msg: 'No autorizado'
        });
    }
};
exports.default = validaToken;
