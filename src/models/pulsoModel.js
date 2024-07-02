const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pulso = sequelize.define('Pulso', {
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
    tableName: 'pulso',
    timestamps: false
});

module.exports = Pulso;
