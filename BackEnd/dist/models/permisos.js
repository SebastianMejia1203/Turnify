"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const menu_1 = __importDefault(require("./menu"));
const rol_1 = __importDefault(require("./rol"));
class Permiso extends sequelize_1.Model {
}
Permiso.init({
    idPermiso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idRol: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: rol_1.default,
            key: 'idRol',
        },
    },
    idMenu: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: menu_1.default,
            key: 'idMenu',
        },
    },
    estadoPermiso: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Permiso',
    tableName: 'Permisos',
    timestamps: false,
});
exports.default = Permiso;
