// horarioModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Horario = sequelize.define('Horario', {
  HorarioID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Dia: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'horarios',
  timestamps: false
});

module.exports = Horario;
