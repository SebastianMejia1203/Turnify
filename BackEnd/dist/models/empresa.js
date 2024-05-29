"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Empresa extends sequelize_1.Model {
}
Empresa.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    celular: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    mision: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    vision: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Empresa',
    tableName: 'Empresa',
    timestamps: false,
});
exports.default = Empresa;
