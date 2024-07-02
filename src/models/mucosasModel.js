const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Mucosas = sequelize.define('Mucosas', {
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
    tableName: 'mucosas',
    timestamps: false
});

module.exports = Mucosas;
