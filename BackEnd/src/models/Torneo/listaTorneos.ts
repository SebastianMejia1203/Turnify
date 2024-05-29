import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/connection';

class ListaTorneos extends Model { }

ListaTorneos.init({
    idTorneo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombreJuego: DataTypes.STRING(100),
    inscripcionesActivas: DataTypes.BOOLEAN,
    estadoTorneo: DataTypes.BOOLEAN,
    popularidad: DataTypes.INTEGER,
    fechaCreacion: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'ListaTorneos',
    tableName: 'listaTorneos',
    timestamps: false,
});

export default ListaTorneos;