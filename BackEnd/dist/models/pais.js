"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Pais extends sequelize_1.Model {
}
Pais.init({
    idPais: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    nombrePais: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    iconoBandera: {
        type: sequelize_1.DataTypes.STRING(255),
    },
}, {
    sequelize: connection_1.default,
    tableName: 'Paises',
    timestamps: false,
});
exports.default = Pais;
