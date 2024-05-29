import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class GeneroUsuario extends Model{
    public idGenero!: number;
    public nombreGenero!: string;
}

GeneroUsuario.init(
    {
        idGenero: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreGenero: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'GeneroUsuario',
        timestamps: false,
    }
);

export default GeneroUsuario;