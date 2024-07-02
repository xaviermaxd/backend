const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Temperamento = sequelize.define('Temperamento', {
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
    tableName: 'temperamento',
    timestamps: false
});

module.exports = Temperamento;
