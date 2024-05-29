// models/Juego.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';
import Juego from './juegos';

class Torneo extends Model {
    idTorneo!: number;
    idJuego!: number;
    nombreTorneo!: string;
    descripcion!: string;
    fechaHoraInicio!: Date;
    fechaFin!: Date;
    costeInscripcion!: number;
    maxUsuarios!: number;
    minUsuarios!: number;
    URLFotoTorneo!: string;
    diasRegistro!: number;
    inscripcionesActivas!: boolean;
    premio!: string;
    estadoTorneo!: boolean;
    modalidadEquipo!: boolean;
}


Torneo.init({
    idTorneo: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    idJuego: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    nombreTorneo: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    fechaHoraInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    costeInscripcion: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    maxUsuarios: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    minUsuarios: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    URLFotoTorneo: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    diasRegistro: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    inscripcionesActivas: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    premio: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    estadoTorneo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    modalidadEquipo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    tableName: 'Torneos',
    sequelize: sequelize,
    timestamps: false,
});

Torneo.belongsTo(Juego, { foreignKey: 'idJuego' });

export default Torneo;