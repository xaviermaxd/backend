// intentoReservaModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const IntentoReserva = sequelize.define('IntentoReserva', {
  IntentoID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  FechaSolicitada: {
    type: DataTypes.DATE,
    allowNull: false
  },
  FechaIntento: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'intentos_reserva',
  timestamps: false
});

module.exports = IntentoReserva;
