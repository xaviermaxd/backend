const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SustanciaActiva = sequelize.define('SustanciaActiva', {
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
    tableName: 'sustancias_activas',
    timestamps: false
});

module.exports = SustanciaActiva;
