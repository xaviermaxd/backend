const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Propietario = sequelize.define('Propietario', {
    PropietarioID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    SegundoNombre: {
        type: DataTypes.STRING,
        allowNull: true  
    },
    ApellidoPaterno: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    ApellidoMaterno: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    Direccion: {
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
        type: DataTypes.TINYINT,
        defaultValue: 1
    },
    DNI: {
        type: DataTypes.STRING,
        allowNull: true  
    },
    Foto: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'propietarios',
    timestamps: false
});

module.exports = Propietario;
