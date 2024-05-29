"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_1 = __importDefault(require("../controllers/rol"));
const router = (0, express_1.Router)();
router.get('/', rol_1.default.getRoles);
router.post('/', rol_1.default.createRol);
router.put('/:id', rol_1.default.updateRol);
router.delete('/:id', rol_1.default.deleteRol);
exports.default = router;
