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
const rolesUsuario_1 = __importDefault(require("../models/rolesUsuario"));
class RolesUsuarioController {
    getRolesUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesUsuarios = yield rolesUsuario_1.default.findAll();
                res.json(rolesUsuarios);
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al obtener los roles de usuarios.' });
            }
        });
    }
    createRolUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idRol, idUsuario, estadoRol } = req.body;
                const newRolUsuario = yield rolesUsuario_1.default.create({ idRol, idUsuario, estadoRol });
                res.json(newRolUsuario);
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al crear el rol de usuario.' });
            }
        });
    }
    updateRolUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idRol, idUsuario } = req.params;
                const { estadoRol } = req.body;
                yield rolesUsuario_1.default.update({ estadoRol }, { where: { idRol, idUsuario } });
                res.json({ message: 'Rol de usuario actualizado correctamente.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al actualizar el rol de usuario.' });
            }
        });
    }
    deleteRolUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idRol, idUsuario } = req.params;
                yield rolesUsuario_1.default.destroy({ where: { idRol, idUsuario } });
                res.json({ message: 'Rol de usuario eliminado correctamente.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Hubo un error al eliminar el rol de usuario.' });
            }
        });
    }
}
exports.default = new RolesUsuarioController();
