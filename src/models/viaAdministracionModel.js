const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ViaAdministracion = sequelize.define('ViaAdministracion', {
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
    tableName: 'vias_administracion',
    timestamps: false
});

module.exports = ViaAdministracion;
