// models/Juego.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Juego extends Model {
    public idJuego!: number;
    public nombreJuego!: string;
    public URLFotoJuego!: string;
    public estadoJuego!: boolean;
}

Juego.init({
    idJuego: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombreJuego: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    URLFotoJuego: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    estadoJuego: {
        type: new DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    tableName: 'Juego',
    sequelize: sequelize, // Esto es la instancia de Sequelize
    timestamps: false, // No queremos marcas de tiempo
});

export default Juego;