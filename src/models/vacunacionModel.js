// models/vacunacionModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Mascota = require('./mascotaModel');
const Veterinario = require('./veterinarioModel');

const Vacunacion = sequelize.define('Vacunacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_aplicacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    peso: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    frecuencia_cardiaca: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    frecuencia_respiratoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    temperatura: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false
    },
    recordatorio: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    fecha_proxima_visita: {
        type: DataTypes.DATE,
        allowNull: true
    },
    mascota_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Mascota,
            key: 'id'
        }
    },
    veterinario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Veterinario,
            key: 'id'
        }
    },
    habilitado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'vacunacion',
    timestamps: false
});

// Vacunacion.belongsTo(Mascota, { foreignKey: 'mascota_id' });
// Vacunacion.belongsTo(Veterinario, { foreignKey: 'veterinario_id' });

Vacunacion.belongsTo(Mascota, { foreignKey: 'mascota_id', as: 'Mascota' });
Vacunacion.belongsTo(Veterinario, { foreignKey: 'veterinario_id', as: 'Veterinario' });

module.exports = Vacunacion;
