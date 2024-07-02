const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Laboratorio = require('./laboratorioModel');
const Pais = require('./paisModel');
const ViaAdministracion = require('./viaAdministracionModel');
const SustanciaActiva = require('./sustanciaActivaModel');
const UsoTerapeutico = require('./usoTerapeuticoModel');

const Medicamento = sequelize.define('Medicamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    laboratorio_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Laboratorio,
            key: 'id'
        }
    },
    pais_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Pais,
            key: 'id'
        }
    },
    registro_sanitario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    composicion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    indicaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    contraindicaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    precauciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    reacciones_adversas: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    via_administracion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ViaAdministracion,
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
    uso_terapeutico_id: {
        type: DataTypes.INTEGER,
        references: {
            model: UsoTerapeutico,
            key: 'id'
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    documento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Habilitado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'medicamentos',
    timestamps: false
});

Medicamento.belongsTo(Laboratorio, { foreignKey: 'laboratorio_id', as: 'Laboratorio' });
Medicamento.belongsTo(Pais, { foreignKey: 'pais_id', as: 'Pais' });
Medicamento.belongsTo(ViaAdministracion, { foreignKey: 'via_administracion_id', as: 'ViaAdministracion' });
Medicamento.belongsTo(SustanciaActiva, { foreignKey: 'sustancia_id', as: 'SustanciaActiva' });
Medicamento.belongsTo(UsoTerapeutico, { foreignKey: 'uso_terapeutico_id', as: 'UsoTerapeutico' });


module.exports = Medicamento;
