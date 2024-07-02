const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Especie = sequelize.define('Especie', {
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
    tableName: 'especies',
    timestamps: false
});

module.exports = Especie;
