import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Empresa extends Model {}

Empresa.init(
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        celular: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        mision: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        vision: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Empresa',
        tableName: 'Empresa',
        timestamps: false,
    }
);

export default Empresa;