const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Medicamento = require('./medicamentoModel');
const Especie = require('./especieModel');

const PosologiaPorEspecie = sequelize.define('PosologiaPorEspecie', {
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
    especie_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Especie,
            key: 'id'
        }
    },
    dosificacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Habilitado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'posologia_por_especie',
    timestamps: false
});

PosologiaPorEspecie.belongsTo(Medicamento, { foreignKey: 'medicamento_id' });
PosologiaPorEspecie.belongsTo(Especie, { foreignKey: 'especie_id' });

module.exports = PosologiaPorEspecie;
