const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Mascota = require('./mascotaModel');
const Veterinario = require('./veterinarioModel');

const HistorialClinico = sequelize.define('HistorialClinico', {
    HistorialID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    MascotaID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'mascotas', // Nombre de la tabla de mascotas
            key: 'MascotaID'
        }
    },
    VeterinarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'veterinarios', // Nombre de la tabla de veterinarios
            key: 'VeterinarioID'
        }
    },
    Fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    MotivoConsulta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Peso: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    Temperatura: {
        type: DataTypes.DECIMAL(4, 1),
        allowNull: true
    },
    FrecuenciaCardiaca: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    FrecuenciaRespiratoria: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    CondicionCorporal: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Dieta: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    EnfermedadesPrevias: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Esterilizado: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    NumeroPartos: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    CirugiasPrevias: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    EsquemaVacunal: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    UltimaDesparasitacion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    TratamientosRecientes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ViajesRecientes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ViveConOtrosAnimales: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    ComportamientoAnimal: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    DiagnosticoPresuntivo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    PlanTerapeutico: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Evolucion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ProximoControl: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ObservacionesGenerales: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ExamenFisicoDetalles: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ListaProblemas: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ListaDiagnosticosDiferenciales: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ExamenesComplementariosResultados: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Pronostico: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Habilitado: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    }
}, {
    tableName: 'historial_clinico', // Nombre real de la tabla en la base de datos
    timestamps: false // Indica que no se utilizarán los campos `createdAt` y `updatedAt`
});

// Definir relaciones directamente
// HistorialClinico.belongsTo(Mascota, { foreignKey: 'MascotaID' });
// HistorialClinico.belongsTo(Veterinario, { foreignKey: 'VeterinarioID' });

// En historialClinicoModel.js
HistorialClinico.belongsTo(Mascota, { foreignKey: 'MascotaID', as: 'Mascota' });
HistorialClinico.belongsTo(Veterinario, { foreignKey: 'VeterinarioID', as: 'Veterinario' });


module.exports = HistorialClinico;
