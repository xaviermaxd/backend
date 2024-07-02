// reservaModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Turno = require('./turnoModel');
const Propietario = require('./propietarioModel');
const Mascota = require('./mascotaModel');

const Reserva = sequelize.define('Reserva', {
  ReservaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  TurnoID: {
    type: DataTypes.INTEGER,
    references: {
      model: Turno,
      key: 'TurnoID'
    }
  },
  PropietarioID: {
    type: DataTypes.INTEGER,
    references: {
      model: Propietario,
      key: 'PropietarioID'
    }
  },
  MascotaID: {
    type: DataTypes.INTEGER,
    references: {
      model: Mascota,
      key: 'MascotaID'
    }
  },
  Notas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  FechaReserva: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Estado: {
    type: DataTypes.STRING,
    defaultValue: 'Reservado'
  },
  FechaCreacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'reservas',
  timestamps: false
});

Reserva.belongsTo(Turno, { foreignKey: 'TurnoID' });
Reserva.belongsTo(Propietario, { foreignKey: 'PropietarioID' });
Reserva.belongsTo(Mascota, { foreignKey: 'MascotaID' });

module.exports = Reserva;
