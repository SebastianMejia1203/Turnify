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
exports.FiltrarJuegos = exports.getJuegos = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const juegos_1 = __importDefault(require("../models/juegos")); // Importa el modelo de Juego
const getJuegos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaJuegos = yield juegos_1.default.findAll(); // Obtiene todos los juegos
    res.json({
        data: listaJuegos
    });
});
exports.getJuegos = getJuegos;
const FiltrarJuegos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombreJuego = null, ordenamiento = '' } = req.params;
        const juegos = yield connection_1.default.query('CALL FiltrarJuegos(:ordenamiento, :nombreJuego)', { replacements: { nombreJuego, ordenamiento } });
        res.json({ data: juegos });
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener los juegos' });
    }
});
exports.FiltrarJuegos = FiltrarJuegos;
