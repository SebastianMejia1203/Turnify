"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Juego.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const juegos_1 = __importDefault(require("./juegos"));
class Torneo extends sequelize_1.Model {
}
Torneo.init({
    idTorneo: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    idJuego: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    nombreTorneo: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    fechaHoraInicio: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    fechaFin: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    costeInscripcion: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    maxUsuarios: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    minUsuarios: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    URLFotoTorneo: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    diasRegistro: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    inscripcionesActivas: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    premio: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    estadoTorneo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    modalidadEquipo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    tableName: 'Torneos',
    sequelize: connection_1.default,
    timestamps: false,
});
Torneo.belongsTo(juegos_1.default, { foreignKey: 'idJuego' });
exports.default = Torneo;
