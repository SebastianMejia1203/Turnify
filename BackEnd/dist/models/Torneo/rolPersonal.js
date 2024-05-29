"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const personalTorneo_1 = __importDefault(require("./personalTorneo"));
const rol_1 = __importDefault(require("./rol"));
class RolPersonal extends sequelize_1.Model {
}
RolPersonal.init({
    idRol: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    idTorneo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    estadoRol: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'RolPersonal',
    tableName: 'RolPersonal',
    timestamps: false,
});
RolPersonal.belongsTo(rol_1.default, { foreignKey: 'idRol' });
RolPersonal.belongsTo(personalTorneo_1.default, { foreignKey: 'idTorneo' });
RolPersonal.belongsTo(personalTorneo_1.default, { foreignKey: 'idUsuario' });
exports.default = RolPersonal;
