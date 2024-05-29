"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const torneos_1 = __importDefault(require("./torneos"));
class ReglasTorneo extends sequelize_1.Model {
}
ReglasTorneo.init({
    idRegla: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    idTorneo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: torneos_1.default,
            key: 'idTorneo',
        },
        primaryKey: true,
    },
    valorEspecifico: sequelize_1.DataTypes.STRING(255),
    estadoRegla: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'ReglasTorneo',
    tableName: 'ReglasTorneo',
    timestamps: false,
});
ReglasTorneo.belongsTo(torneos_1.default, { foreignKey: 'idTorneo' });
module.exports = ReglasTorneo;
