"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_1 = __importDefault(require("../controllers/menu"));
const router = (0, express_1.Router)();
router.get('/', menu_1.default.getMenus);
router.post('/', menu_1.default.createMenu);
router.put('/:id', menu_1.default.updateMenu);
router.delete('/:id', menu_1.default.deleteMenu);
exports.default = router;
