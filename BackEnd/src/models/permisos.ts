import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';
import Menu from './menu';
import Rol from './rol';

class Permiso extends Model {}

Permiso.init(
    {
        idPermiso: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idRol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Rol,
                key: 'idRol',
            },
        },
        idMenu: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Menu,
                key: 'idMenu',
            },
        },
        estadoPermiso: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Permiso',
        tableName: 'Permisos',
        timestamps: false,
    }
);

export default Permiso;