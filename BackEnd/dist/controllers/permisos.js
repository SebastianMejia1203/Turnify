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
const connection_1 = __importDefault(require("../db/connection"));
const permisos_1 = __importDefault(require("../models/permisos"));
class PermisoController {
    getPermisos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const permisos = yield permisos_1.default.findAll();
                res.json({
                    data: permisos
                });
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al obtener los permisos.' });
            }
        });
    }
    createPermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idRol, idMenu, estadoPermiso } = req.body;
                const newPermiso = yield permisos_1.default.create({ idRol, idMenu, estadoPermiso });
                res.json(newPermiso);
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al crear el permiso.' });
            }
        });
    }
    updatePermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPermiso } = req.params;
                const { idRol, idMenu, estadoPermiso } = req.body;
                yield permisos_1.default.update({ idRol, idMenu, estadoPermiso }, { where: { idPermiso } });
                res.json({ message: 'Permiso actualizado correctamente.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al actualizar el permiso.' });
            }
        });
    }
    deletePermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPermiso } = req.params;
                yield permisos_1.default.destroy({ where: { idPermiso } });
                res.json({ message: 'Permiso eliminado correctamente.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al eliminar el permiso.' });
            }
        });
    }
    getMenusPorUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idUsuario } = req.params;
                const menus = yield connection_1.default.query('CALL ObtenerMenusPorUsuario(:idUsuario)', { replacements: { idUsuario } });
                res.json(menus);
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al obtener los menus del usuario.' });
            }
        });
    }
}
exports.default = new PermisoController();
