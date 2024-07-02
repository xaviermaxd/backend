const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const StatusMental = sequelize.define('StatusMental', {
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
    tableName: 'statusmental',
    timestamps: false
});

module.exports = StatusMental;
