"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Configura los parámetros de conexión a tu base de datos
const sequelize = new sequelize_1.Sequelize('turnify', 'root', 'nancy123', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = sequelize;
