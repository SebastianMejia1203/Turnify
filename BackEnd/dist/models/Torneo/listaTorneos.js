"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
class ListaTorneos extends sequelize_1.Model {
}
ListaTorneos.init({
    idTorneo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    nombreJuego: sequelize_1.DataTypes.STRING(100),
    inscripcionesActivas: sequelize_1.DataTypes.BOOLEAN,
    estadoTorneo: sequelize_1.DataTypes.BOOLEAN,
    popularidad: sequelize_1.DataTypes.INTEGER,
    fechaCreacion: sequelize_1.DataTypes.DATE,
}, {
    sequelize: connection_1.default,
    modelName: 'ListaTorneos',
    tableName: 'listaTorneos',
    timestamps: false,
});
exports.default = ListaTorneos;
