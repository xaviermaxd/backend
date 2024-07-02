const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const EstadoGeneral = sequelize.define('EstadoGeneral', {
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
    tableName: 'estadogeneral',
    timestamps: false
});

module.exports = EstadoGeneral;
