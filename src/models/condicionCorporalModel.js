const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CondicionCorporal = sequelize.define('CondicionCorporal', {
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
    tableName: 'condicioncorporal',
    timestamps: false
});

module.exports = CondicionCorporal;
