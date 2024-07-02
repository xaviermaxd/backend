// models/desparasitacionModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Mascota = require('./mascotaModel');
const Veterinario = require('./veterinarioModel');

const Desparasitacion = sequelize.define('Desparasitacion', {
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
    tableName: 'desparasitacion',
    timestamps: false
});

Desparasitacion.belongsTo(Mascota, { foreignKey: 'mascota_id', as: 'Mascota' });
Desparasitacion.belongsTo(Veterinario, { foreignKey: 'veterinario_id', as: 'Veterinario' });


module.exports = Desparasitacion;
