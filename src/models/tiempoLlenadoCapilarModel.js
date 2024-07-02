const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TiempoLlenadoCapilar = sequelize.define('TiempoLlenadoCapilar', {
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
    tableName: 'tiempollenadocapilar',
    timestamps: false
});

module.exports = TiempoLlenadoCapilar;
