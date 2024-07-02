const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Presentacion = sequelize.define('Presentacion', {
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
    tableName: 'presentaciones',
    timestamps: false
});

module.exports = Presentacion;
