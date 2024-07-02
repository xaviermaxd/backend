// models/vacunacionMedicamentoModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Vacunacion = require('./vacunacionModel');
const Medicamento = require('./medicamentoModel');
const Mascota = require('./mascotaModel');
const Veterinario = require('./veterinarioModel');

const VacunacionMedicamento = sequelize.define('VacunacionMedicamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vacunacion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Vacunacion,
            key: 'id'
        }
    },
    medicamento_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Medicamento,
            key: 'id'
        }
    },
    dosis: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lote: {
        type: DataTypes.STRING,
        allowNull: true
    },
    habilitado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'vacunacion_medicamento',
    timestamps: false
});

VacunacionMedicamento.belongsTo(Vacunacion, { foreignKey: 'vacunacion_id' });
VacunacionMedicamento.belongsTo(Medicamento, { foreignKey: 'medicamento_id' });

module.exports = VacunacionMedicamento;
