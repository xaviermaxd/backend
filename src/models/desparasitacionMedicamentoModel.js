// models/desparasitacionMedicamentoModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Desparasitacion = require('./desparasitacionModel');
const Medicamento = require('./medicamentoModel');

const DesparasitacionMedicamento = sequelize.define('DesparasitacionMedicamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    desparasitacion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Desparasitacion,
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
    tableName: 'desparasitacion_medicamento',
    timestamps: false
});

DesparasitacionMedicamento.belongsTo(Desparasitacion, { foreignKey: 'desparasitacion_id' });
DesparasitacionMedicamento.belongsTo(Medicamento, { foreignKey: 'medicamento_id' });

module.exports = DesparasitacionMedicamento;
