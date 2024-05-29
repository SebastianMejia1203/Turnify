import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';
import Torneos from './torneos';

class ReglasTorneo extends Model { }

ReglasTorneo.init({
    idRegla: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idTorneo: {
        type: DataTypes.INTEGER,
        references: {
            model: Torneos,
            key: 'idTorneo',
        },
        primaryKey: true,
    },
    valorEspecifico: DataTypes.STRING(255),
    estadoRegla: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize,
    modelName: 'ReglasTorneo',
    tableName: 'ReglasTorneo',
    timestamps: false,
});

ReglasTorneo.belongsTo(Torneos, { foreignKey: 'idTorneo' });

module.exports = ReglasTorneo;