import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/connection';
import Torneo from '../torneos';
import Usuario from '../usuario';

class PersonalTorneo extends Model { }

PersonalTorneo.init({
    idTorneo: {
        type: DataTypes.INTEGER,
        references: {
            model: Torneo,
            key: 'idTorneo',
        },
        primaryKey: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'idUsuario',
        },
        primaryKey: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize,
    modelName: 'PersonalTorneo',
    tableName: 'PersonalTorneo',
    timestamps: false,
});

PersonalTorneo.belongsTo(Torneo, { foreignKey: 'idTorneo' });
PersonalTorneo.belongsTo(Usuario, { foreignKey: 'idUsuario' });

export default PersonalTorneo;