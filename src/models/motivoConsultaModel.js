const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const ConsultaMedica = require('./consultaMedicaModel');

const MotivoConsulta = sequelize.define('MotivoConsulta', {
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
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    habilitado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'motivoconsulta',
    timestamps: false
});

MotivoConsulta.belongsTo(ConsultaMedica, { foreignKey: 'consulta_medica_id' });

module.exports = MotivoConsulta;
