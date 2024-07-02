// models/examenesConsultasModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const ConsultaMedica = require('./consultaMedicaModel');
const ExamenMedico = require('./examenesMedicosModel');

const ExamenesConsultas = sequelize.define('ExamenesConsultas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  consulta_medica_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ConsultaMedica,
      key: 'id'
    }
  },
  examen_medico_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ExamenMedico,
      key: 'id'
    }
  },
  observacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  informe: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resultados: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  habilitado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  tableName: 'examenesconsultas',
  timestamps: false
});

ExamenesConsultas.belongsTo(ConsultaMedica, { foreignKey: 'consulta_medica_id' });
ExamenesConsultas.belongsTo(ExamenMedico, { foreignKey: 'examen_medico_id' });

module.exports = ExamenesConsultas;
