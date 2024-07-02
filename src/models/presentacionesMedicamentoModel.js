const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Medicamento = require('./medicamentoModel');
const Presentacion = require('./presentacionModel');

const PresentacionesMedicamento = sequelize.define('PresentacionesMedicamento', {
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
    presentacion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Presentacion,
            key: 'id'
        }
    },
    unidades: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    concentracion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Habilitado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'presentaciones_medicamento',
    timestamps: false
});

PresentacionesMedicamento.belongsTo(Medicamento, { foreignKey: 'medicamento_id' });
PresentacionesMedicamento.belongsTo(Presentacion, { foreignKey: 'presentacion_id' });

module.exports = PresentacionesMedicamento;
