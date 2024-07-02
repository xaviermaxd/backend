const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Laboratorio = sequelize.define('Laboratorio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Habilitado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'laboratorios',
    timestamps: false
});

module.exports = Laboratorio;
