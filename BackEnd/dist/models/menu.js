"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Menu extends sequelize_1.Model {
}
Menu.init({
    idMenu: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    icono: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    accesoA: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Menu',
    tableName: 'Menu',
    timestamps: false,
});
exports.default = Menu;
