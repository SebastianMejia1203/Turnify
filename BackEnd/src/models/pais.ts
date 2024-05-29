import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';


class Pais extends Model {
    public idPais!: number;
    public nombrePais!: string;
    public iconoBandera!: string;
}

Pais.init(
    {
        idPais: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nombrePais: {
            type: DataTypes.STRING(255),
        },
        iconoBandera: {
            type: DataTypes.STRING(255),
        },
    },
    {
        sequelize,
        tableName: 'Paises',
        timestamps: false,
    }
);

export default Pais;