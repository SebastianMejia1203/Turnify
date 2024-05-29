import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';
import Rol from './rol';
import Usuario from './usuario';

class RolesUsuario extends Model {}

RolesUsuario.init(
    {
        idRol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Rol,
                key: 'idRol',
            },
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Usuario,
                key: 'idUsuario',
            },
        },
        estadoRol: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'RolesUsuario',
        tableName: 'RolesUsuario',
        timestamps: false,
    }
);

export default RolesUsuario;