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
exports.eliminarEmpresa = exports.actualizarEmpresa = exports.crearEmpresa = exports.obtenerEmpresa = exports.obtenerEmpresas = void 0;
const empresa_1 = __importDefault(require("../models/empresa"));
const obtenerEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empresas = yield empresa_1.default.findAll();
        res.json(empresas);
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener las empresas' });
    }
});
exports.obtenerEmpresas = obtenerEmpresas;
const obtenerEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empresa = yield empresa_1.default.findByPk(1);
        res.json({ data: empresa });
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener la empresa' });
    }
});
exports.obtenerEmpresa = obtenerEmpresa;
const crearEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empresa = yield empresa_1.default.create(req.body);
        res.json(empresa);
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear la empresa' });
    }
});
exports.crearEmpresa = crearEmpresa;
const actualizarEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield empresa_1.default.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Empresa actualizada con éxito' });
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al actualizar la empresa' });
    }
});
exports.actualizarEmpresa = actualizarEmpresa;
const eliminarEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield empresa_1.default.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Empresa eliminada con éxito' });
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar la empresa' });
    }
});
exports.eliminarEmpresa = eliminarEmpresa;
