import { Sequelize } from 'sequelize';

// Configura los parámetros de conexión a tu base de datos
const sequelize = new Sequelize('turnify', 'root', 'nancy123', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;