const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Medicamento = require('./medicamentoModel');
const SustanciaActiva = require('./sustanciaActivaModel');

const MedicamentoSustancia = sequelize.define('MedicamentoSustancia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    medicamento_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Medicamento,
            key: 'id'
        }
    },
    sustancia_id: {
        type: DataTypes.INTEGER,
        references: {
            model: SustanciaActiva,
            key: 'id'
        }
    },
    Habilitado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'medicamento_sustancia',
    timestamps: false
});

MedicamentoSustancia.belongsTo(Medicamento, { foreignKey: 'medicamento_id' });
MedicamentoSustancia.belongsTo(SustanciaActiva, { foreignKey: 'sustancia_id' });

module.exports = MedicamentoSustancia;
