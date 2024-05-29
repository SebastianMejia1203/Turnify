"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genero_1 = __importDefault(require("../controllers/genero"));
const router = (0, express_1.Router)();
router.get('/', genero_1.default.getGenerosUsuarios);
exports.default = router;
