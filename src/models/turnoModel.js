// turnoModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Horario = require('./horarioModel');

const Turno = sequelize.define('Turno', {
  TurnoID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  HorarioID: {
    type: DataTypes.INTEGER,
    references: {
      model: Horario,
      key: 'HorarioID'
    }
  },
  HoraInicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  HoraFin: {
    type: DataTypes.TIME,
    allowNull: false
  },
  Capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'turnos',
  timestamps: false
});

Turno.belongsTo(Horario, { foreignKey: 'HorarioID' });

module.exports = Turno;
