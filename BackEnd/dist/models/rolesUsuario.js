"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const rol_1 = __importDefault(require("./rol"));
const usuario_1 = __importDefault(require("./usuario"));
class RolesUsuario extends sequelize_1.Model {
}
RolesUsuario.init({
    idRol: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: rol_1.default,
            key: 'idRol',
        },
    },
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: usuario_1.default,
            key: 'idUsuario',
        },
    },
    estadoRol: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'RolesUsuario',
    tableName: 'RolesUsuario',
    timestamps: false,
});
exports.default = RolesUsuario;
