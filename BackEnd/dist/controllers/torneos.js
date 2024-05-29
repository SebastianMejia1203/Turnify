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
exports.FiltrarTorneos = exports.torneoReciente = exports.torneoMayorPopularidad = exports.personalTorneo = exports.misTorneos = exports.listaTorneos = exports.getTorneo = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const juegos_1 = __importDefault(require("../models/juegos"));
const rolPersonal_1 = __importDefault(require("../models/rolPersonal"));
const listaTorneos_1 = __importDefault(require("../models/Torneo/listaTorneos"));
const torneos_1 = __importDefault(require("../models/torneos")); // Importa el modelo
const getTorneo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaTorneos = yield torneos_1.default.findAll({
        include: [{
                model: juegos_1.default,
                as: 'Juego',
                attributes: ['nombreJuego'] // Solo incluye el nombre del juego en los resultados
            }]
    }); // Obtiene todos los torneos y sus juegos asociados
    res.json({
        data: listaTorneos
    });
});
exports.getTorneo = getTorneo;
const listaTorneos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaTorneos = yield listaTorneos_1.default.findAll();
    res.json({
        data: listaTorneos
    });
});
exports.listaTorneos = listaTorneos;
const misTorneos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const listaTorneos = yield connection_1.default.query('CALL misTorneos(:id)', { replacements: { id } });
    res.json({
        data: listaTorneos
    });
});
exports.misTorneos = misTorneos;
const personalTorneo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.body.idUsuario;
    const listaTorneos = yield rolPersonal_1.default.findAll({ where: { idUsuario: usuarioId } });
    res.json({
        data: listaTorneos
    });
});
exports.personalTorneo = personalTorneo;
const torneoMayorPopularidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lista = yield connection_1.default.query('CALL torneoMayorPopularidad()');
        res.json({
            data: lista
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener la lista de torneos popularidad' });
    }
});
exports.torneoMayorPopularidad = torneoMayorPopularidad;
const torneoReciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lista = yield connection_1.default.query('CALL torneoReciente()');
        res.json({
            data: lista
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener la lista de torneos recientes' });
    }
});
exports.torneoReciente = torneoReciente;
const FiltrarTorneos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombreJuego = null, ordenamiento = '' } = req.params;
        const torneos = yield connection_1.default.query('CALL FiltrarTorneos(:ordenamiento, :nombreJuego)', { replacements: { nombreJuego, ordenamiento } });
        res.json({ data: torneos });
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener los torneos' });
    }
});
exports.FiltrarTorneos = FiltrarTorneos;
