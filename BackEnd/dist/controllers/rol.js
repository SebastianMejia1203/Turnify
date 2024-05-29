"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rol_1 = __importDefault(require("../models/rol"));
class RolController {
    getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield rol_1.default.findAll();
                res.json(roles);
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al obtener los roles.' });
            }
        });
    }
    createRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombreRol } = req.body;
                const newRol = yield rol_1.default.create({ nombreRol });
                res.json(newRol);
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al crear el rol.' });
            }
        });
    }
    updateRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idRol } = req.params;
                const { nombreRol } = req.body;
                yield rol_1.default.update({ nombreRol }, { where: { idRol } });
                res.json({ message: 'Rol actualizado correctamente.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al actualizar el rol.' });
            }
        });
    }
    deleteRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idRol } = req.params;
                yield rol_1.default.destroy({ where: { idRol } });
                res.json({ message: 'Rol eliminado correctamente.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al eliminar el rol.' });
            }
        });
    }
}
exports.default = new RolController();
