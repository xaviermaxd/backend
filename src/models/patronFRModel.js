const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PatronFR = sequelize.define('PatronFR', {
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
    tableName: 'patronfr',
    timestamps: false
});

module.exports = PatronFR;
