const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Veterinario = require('./veterinarioModel');
const Mascota = require('./mascotaModel');
const EstadoGeneral = require('./estadoGeneralModel');
const StatusMental = require('./statusMentalModel');
const Temperamento = require('./temperamentoModel');
const Comportamiento = require('./comportamientoModel');
const CondicionCorporal = require('./condicionCorporalModel');
const PatronFC = require('./patronFCModel');
const PatronFR = require('./patronFRModel');
const Pulso = require('./pulsoModel');
const Mucosas = require('./mucosasModel');
const TiempoLlenadoCapilar = require('./tiempoLlenadoCapilarModel');
const EstadoHidratacion = require('./estadoHidratacionModel');

const ConsultaMedica = sequelize.define('ConsultaMedica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    veterinario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Veterinario,
            key: 'id'
        }
    },
    mascota_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Mascota,
            key: 'id'
        }
    },
    fecha_consulta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    curso: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tiempo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descripcion_propietario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado_general_id: {
        type: DataTypes.INTEGER,
        references: {
            model: EstadoGeneral,
            key: 'id'
        }
    },
    status_mental_id: {
        type: DataTypes.INTEGER,
        references: {
            model: StatusMental,
            key: 'id'
        }
    },
    temperamento_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Temperamento,
            key: 'id'
        }
    },
    comportamiento_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Comportamiento,
            key: 'id'
        }
    },
    condicion_corporal_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CondicionCorporal,
            key: 'id'
        }
    },
    patron_fc_id: {
        type: DataTypes.INTEGER,
        references: {
            model: PatronFC,
            key: 'id'
        }
    },
    frecuencia_cardiaca: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    patron_fr_id: {
        type: DataTypes.INTEGER,
        references: {
            model: PatronFR,
            key: 'id'
        }
    },
    frecuencia_respiratoria: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    glucemia: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pas: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pad: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pam: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pulso_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Pulso,
            key: 'id'
        }
    },
    peso: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    temperatura: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    mucosas_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Mucosas,
            key: 'id'
        }
    },
    tiempo_llenado_capilar_id: {
        type: DataTypes.INTEGER,
        references: {
            model: TiempoLlenadoCapilar,
            key: 'id'
        }
    },
    estado_hidratacion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: EstadoHidratacion,
            key: 'id'
        }
    },
    necesita_examenes: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    realizo_tratamientos: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    descripcion_tratamiento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    diagnostico_presuntivo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    observaciones_adicionales: {
        type: DataTypes.STRING,
        allowNull: true
    },
    habilitado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'consultamedica',
    timestamps: false
});

ConsultaMedica.belongsTo(Veterinario, { foreignKey: 'veterinario_id', as: 'Veterinario' });
ConsultaMedica.belongsTo(Mascota, { foreignKey: 'mascota_id', as: 'Mascota' });
ConsultaMedica.belongsTo(EstadoGeneral, { foreignKey: 'estado_general_id', as: 'EstadoGeneral' });
ConsultaMedica.belongsTo(StatusMental, { foreignKey: 'status_mental_id', as: 'StatusMental' });
ConsultaMedica.belongsTo(Temperamento, { foreignKey: 'temperamento_id', as: 'Temperamento' });
ConsultaMedica.belongsTo(Comportamiento, { foreignKey: 'comportamiento_id', as: 'Comportamiento' });
ConsultaMedica.belongsTo(CondicionCorporal, { foreignKey: 'condicion_corporal_id', as: 'CondicionCorporal' });
ConsultaMedica.belongsTo(PatronFC, { foreignKey: 'patron_fc_id', as: 'PatronFC' });
ConsultaMedica.belongsTo(PatronFR, { foreignKey: 'patron_fr_id', as: 'PatronFR' });
ConsultaMedica.belongsTo(Pulso, { foreignKey: 'pulso_id', as: 'Pulso' });
ConsultaMedica.belongsTo(Mucosas, { foreignKey: 'mucosas_id', as: 'Mucosas' });
ConsultaMedica.belongsTo(TiempoLlenadoCapilar, { foreignKey: 'tiempo_llenado_capilar_id', as: 'TiempoLlenadoCapilar' });
ConsultaMedica.belongsTo(EstadoHidratacion, { foreignKey: 'estado_hidratacion_id', as: 'EstadoHidratacion' });

module.exports = ConsultaMedica;
