"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const torneos_1 = __importDefault(require("./torneos"));
const usuario_1 = __importDefault(require("./usuario"));
class PersonalTorneo extends sequelize_1.Model {
}
PersonalTorneo.init({
    idTorneo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: torneos_1.default,
            key: 'idTorneo',
        },
        primaryKey: true,
    },
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: usuario_1.default,
            key: 'idUsuario',
        },
        primaryKey: true,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'PersonalTorneo',
    tableName: 'PersonalTorneo',
    timestamps: false,
});
PersonalTorneo.belongsTo(torneos_1.default, { foreignKey: 'idTorneo' });
PersonalTorneo.belongsTo(usuario_1.default, { foreignKey: 'idUsuario' });
exports.default = PersonalTorneo;
