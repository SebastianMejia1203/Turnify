import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Menu extends Model {}

Menu.init(
    {
        idMenu: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        icono: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        accesoA: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Menu',
        tableName: 'Menu',
        timestamps: false,
    }
);

export default Menu;