"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresa_1 = require("../controllers/empresa");
const router = (0, express_1.Router)();
router.get('/', empresa_1.obtenerEmpresa);
router.put('/:id', empresa_1.actualizarEmpresa);
exports.default = router;
