const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const ConsultaMedica = require('./consultaMedicaModel');
const Sistemas = require('./sistemasModel');

const ListaProblemas = sequelize.define('ListaProblemas', {
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
    sistema_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Sistemas,
            key: 'id'
        }
    },
    hallazgo_fisico: {
        type: DataTypes.STRING,
        allowNull: true
    },
    observacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    habilitado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'listaproblemas',
    timestamps: false
});

ListaProblemas.belongsTo(ConsultaMedica, { foreignKey: 'consulta_medica_id' });
ListaProblemas.belongsTo(Sistemas, { foreignKey: 'sistema_id' });

module.exports = ListaProblemas;
