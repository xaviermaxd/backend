const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Comportamiento = sequelize.define('Comportamiento', {
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
    tableName: 'comportamiento',
    timestamps: false
});

module.exports = Comportamiento;
