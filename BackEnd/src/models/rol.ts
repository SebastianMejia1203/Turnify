import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Rol extends Model {
    public idRol!: number;
    public nombreRol!: string;
}

Rol.init(
    {
        idRol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreRol: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'Rol',
        timestamps: false,
    }
);

export default Rol;