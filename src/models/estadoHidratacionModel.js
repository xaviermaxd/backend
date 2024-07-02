const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const EstadoHidratacion = sequelize.define('EstadoHidratacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    habilitado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'estadohidratacion',
    timestamps: false
});

module.exports = EstadoHidratacion;
