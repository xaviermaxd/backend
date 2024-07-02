// mascotaModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Propietario = require('./propietarioModel');
const Veterinario = require('./vetModel');

const Mascota = sequelize.define('Mascota', {
    MascotaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PropietarioID: {
        type: DataTypes.INTEGER,
        references: {
            model: Propietario,
            key: 'PropietarioID'
        }
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Especie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Raza: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Alergias: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Habilitado: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    },
    Foto: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'mascotas',
    timestamps: false
});

Mascota.belongsTo(Propietario, { foreignKey: 'PropietarioID' });

module.exports = Mascota;
