"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Usuario extends sequelize_1.Model {
}
Usuario.init({
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    nickname: {
        type: sequelize_1.DataTypes.STRING(15),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    celular: {
        type: sequelize_1.DataTypes.STRING(12),
    },
    fechaNacimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
    fechaRegistro: {
        type: sequelize_1.DataTypes.DATE,
    },
    idPais: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Paises',
            key: 'idPais',
        },
    },
    idGenero: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'GeneroUsuario',
            key: 'idGenero',
        },
    },
    fotoPerfil: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING(20),
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Usuario',
    tableName: 'Usuario',
    timestamps: false,
});
exports.default = Usuario;
