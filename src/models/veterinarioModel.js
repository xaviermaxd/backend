const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Veterinario = sequelize.define('Veterinario', {
    VeterinarioID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ApellidoPaterno: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ApellidoMaterno: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Especialidad: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CorreoElectronico: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Habilitado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    Rol: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DNI: {
        type: DataTypes.STRING,
        defaultValue: '77745454'
    },
    COD_VET: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FotoDNI: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CurriculumVitae: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FotoVeterinario: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'veterinarios',
    timestamps: false
});

module.exports = Veterinario;
