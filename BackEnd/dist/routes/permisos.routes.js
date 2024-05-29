"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permisos_1 = __importDefault(require("../controllers/permisos"));
const router = (0, express_1.Router)();
router.get('/', permisos_1.default.getPermisos);
router.post('/', permisos_1.default.createPermiso);
router.put('/:id', permisos_1.default.updatePermiso);
router.delete('/:id', permisos_1.default.deletePermiso);
router.get('/:idUsuario', permisos_1.default.getMenusPorUsuario);
exports.default = router;
