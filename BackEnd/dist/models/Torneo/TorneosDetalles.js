"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
class TorneosDetalles extends sequelize_1.Model {
}
TorneosDetalles.init({
    idTorneo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    nombreTorneo: sequelize_1.DataTypes.STRING(100),
    descripcion: sequelize_1.DataTypes.TEXT,
    fechaHoraInicio: sequelize_1.DataTypes.DATE,
    fechaFin: sequelize_1.DataTypes.DATE,
    costeInscripcion: sequelize_1.DataTypes.DECIMAL(10, 2),
    maxUsuarios: sequelize_1.DataTypes.INTEGER,
    minUsuarios: sequelize_1.DataTypes.INTEGER,
    URLFotoTorneo: sequelize_1.DataTypes.STRING(255),
    diasRegistro: sequelize_1.DataTypes.INTEGER,
    inscripcionesActivas: sequelize_1.DataTypes.BOOLEAN,
    premio: sequelize_1.DataTypes.STRING(255),
    estadoTorneo: sequelize_1.DataTypes.BOOLEAN,
    modalidadEquipo: sequelize_1.DataTypes.BOOLEAN,
    popularidad: sequelize_1.DataTypes.INTEGER,
    fechaCreacion: sequelize_1.DataTypes.DATE,
    nombreJuego: sequelize_1.DataTypes.STRING(100),
    URLFotoJuego: sequelize_1.DataTypes.STRING(255),
    juegoPopularidad: sequelize_1.DataTypes.INTEGER,
    estadoJuego: sequelize_1.DataTypes.BOOLEAN,
    idUsuario: sequelize_1.DataTypes.INTEGER,
    personalEstado: sequelize_1.DataTypes.BOOLEAN,
}, {
    sequelize: connection_1.default,
    modelName: 'TorneosDetalles',
    tableName: 'TorneosDetalles',
    timestamps: false,
});
module.exports = TorneosDetalles;
