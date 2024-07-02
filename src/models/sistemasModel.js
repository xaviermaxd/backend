const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Sistemas = sequelize.define('Sistemas', {
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
    tableName: 'sistemas',
    timestamps: false
});

module.exports = Sistemas;
