import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';
import PersonalTorneo from './Torneo/personalTorneo';
import Rol from './rol';

class RolPersonal extends Model { }

RolPersonal.init({
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    idTorneo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    estadoRol: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize,
    modelName: 'RolPersonal',
    tableName: 'RolPersonal',
    timestamps: false,
});

RolPersonal.belongsTo(Rol, { foreignKey: 'idRol' });
RolPersonal.belongsTo(PersonalTorneo, { foreignKey: 'idTorneo' });
RolPersonal.belongsTo(PersonalTorneo, { foreignKey: 'idUsuario' });

export default RolPersonal;
