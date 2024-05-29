"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesUsuario_1 = __importDefault(require("../controllers/rolesUsuario"));
const router = (0, express_1.Router)();
router.get('/', rolesUsuario_1.default.getRolesUsuarios);
router.post('/', rolesUsuario_1.default.createRolUsuario);
router.put('/:id', rolesUsuario_1.default.updateRolUsuario);
router.delete('/:id', rolesUsuario_1.default.deleteRolUsuario);
exports.default = router;
