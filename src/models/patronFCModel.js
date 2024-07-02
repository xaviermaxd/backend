const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PatronFC = sequelize.define('PatronFC', {
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
    tableName: 'patronfc',
    timestamps: false
});

module.exports = PatronFC;
