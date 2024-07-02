const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UsoTerapeutico = sequelize.define('UsoTerapeutico', {
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
    tableName: 'usos_terapeuticos',
    timestamps: false
});

module.exports = UsoTerapeutico;
