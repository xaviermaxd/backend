const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pais = sequelize.define('Pais', {
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
    tableName: 'paises',
    timestamps: false
});

module.exports = Pais;
