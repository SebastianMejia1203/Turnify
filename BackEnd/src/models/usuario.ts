import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Usuario extends Model {
    idUsuario!: number;
    nombre!: string;
    apellido!: string;
    nickname!: string;
    email!: string;
    celular!: string;
    fechaNacimiento!: Date;
    fechaRegistro!: Date;
    idPais!: number;
    idGenero!: number;
    fotoPerfil!: string;
    estado!: boolean;
    contrasena!: string;
}

Usuario.init(
    {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
        },
        apellido: {
            type: DataTypes.STRING(50),
        },
        nickname: {
            type: DataTypes.STRING(15),
        },
        email: {
            type: DataTypes.STRING(100),
        },
        celular: {
            type: DataTypes.STRING(12),
        },
        fechaNacimiento: {
            type: DataTypes.DATE,
        },
        fechaRegistro: {
            type: DataTypes.DATE,
        },
        idPais: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Paises',
                key: 'idPais',
            },
        },
        idGenero: {
            type: DataTypes.INTEGER,
            references: {
                model: 'GeneroUsuario',
                key: 'idGenero',
            },
        },
        fotoPerfil: {
            type: DataTypes.STRING(255),
        },
        estado: {
            type: DataTypes.BOOLEAN,
        },
        contrasena: {
            type: DataTypes.STRING(20),
        },
    },
    {
        sequelize,
        modelName: 'Usuario',
        tableName: 'Usuario',
        timestamps: false,
    }
);

export default Usuario;
