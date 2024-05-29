"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Juego.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Juego extends sequelize_1.Model {
}
Juego.init({
    idJuego: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombreJuego: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    URLFotoJuego: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    estadoJuego: {
        type: new sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    tableName: 'Juego',
    sequelize: connection_1.default, // Esto es la instancia de Sequelize
    timestamps: false, // No queremos marcas de tiempo
});
exports.default = Juego;
