const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ExamenesMedicos = sequelize.define('ExamenesMedicos', {
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
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'examenesmedicos',
    timestamps: false
});

module.exports = ExamenesMedicos;
