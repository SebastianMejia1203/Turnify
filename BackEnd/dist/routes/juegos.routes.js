"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const juegos_1 = require("../controllers/juegos");
const router = (0, express_1.Router)();
router.get('/', juegos_1.getJuegos);
router.get('/filtrar/:nombreJuego?/:ordenamiento?', juegos_1.FiltrarJuegos);
exports.default = router;
