const ConsultaMedica = require('../models/consultaMedicaModel');
const Veterinario = require('../models/veterinarioModel');
const Mascota = require('../models/mascotaModel');
const EstadoGeneral = require('../models/estadoGeneralModel');
const StatusMental = require('../models/statusMentalModel');
const Temperamento = require('../models/temperamentoModel');
const Comportamiento = require('../models/comportamientoModel');
const CondicionCorporal = require('../models/condicionCorporalModel');
const PatronFC = require('../models/patronFCModel');
const PatronFR = require('../models/patronFRModel');
const Pulso = require('../models/pulsoModel');
const Mucosas = require('../models/mucosasModel');
const TiempoLlenadoCapilar = require('../models/tiempoLlenadoCapilarModel');
const EstadoHidratacion = require('../models/estadoHidratacionModel');

exports.createConsultaMedica = async (req, res) => {
    try {
        const consultaMedica = await ConsultaMedica.create(req.body);
        res.status(201).json(consultaMedica);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear consulta médica', error: error.message });
    }
};

exports.updateConsultaMedica = async (req, res) => {
    try {
        const { id } = req.params;
        await ConsultaMedica.update(req.body, { where: { id } });
        res.status(200).json({ message: 'Consulta médica actualizada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar consulta médica', error: error.message });
    }
};

exports.deleteConsultaMedica = async (req, res) => {
    try {
        const { id } = req.params;
        await ConsultaMedica.update({ habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: 'Consulta médica deshabilitada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al deshabilitar consulta médica', error: error.message });
    }
};

exports.getAllConsultaMedica = async (req, res) => {
    try {
        const consultasMedicas = await ConsultaMedica.findAll({
            where: { habilitado: 1 },
            include: [
                { model: Veterinario, as: 'Veterinario' },
                { model: Mascota, as: 'Mascota' },
                { model: EstadoGeneral, as: 'EstadoGeneral' },
                { model: StatusMental, as: 'StatusMental' },
                { model: Temperamento, as: 'Temperamento' },
                { model: Comportamiento, as: 'Comportamiento' },
                { model: CondicionCorporal, as: 'CondicionCorporal' },
                { model: PatronFC, as: 'PatronFC' },
                { model: PatronFR, as: 'PatronFR' },
                { model: Pulso, as: 'Pulso' },
                { model: Mucosas, as: 'Mucosas' },
                { model: TiempoLlenadoCapilar, as: 'TiempoLlenadoCapilar' },
                { model: EstadoHidratacion, as: 'EstadoHidratacion' }
            ]
        });
        res.status(200).json(consultasMedicas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener consultas médicas', error: error.message });
    }
};

exports.getConsultaMedicaById = async (req, res) => {
    try {
        const { id } = req.params;
        const consultaMedica = await ConsultaMedica.findOne({
            where: { id, habilitado: 1 },
            include: [
                { model: Veterinario, as: 'Veterinario' },
                { model: Mascota, as: 'Mascota' },
                { model: EstadoGeneral, as: 'EstadoGeneral' },
                { model: StatusMental, as: 'StatusMental' },
                { model: Temperamento, as: 'Temperamento' },
                { model: Comportamiento, as: 'Comportamiento' },
                { model: CondicionCorporal, as: 'CondicionCorporal' },
                { model: PatronFC, as: 'PatronFC' },
                { model: PatronFR, as: 'PatronFR' },
                { model: Pulso, as: 'Pulso' },
                { model: Mucosas, as: 'Mucosas' },
                { model: TiempoLlenadoCapilar, as: 'TiempoLlenadoCapilar' },
                { model: EstadoHidratacion, as: 'EstadoHidratacion' }
            ]
        });
        if (consultaMedica) {
            res.status(200).json(consultaMedica);
        } else {
            res.status(404).json({ message: 'Consulta médica no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener consulta médica', error: error.message });
    }
};

exports.getConsultaMedicaByMascotaId = async (req, res) => {
    try {
        const { mascota_id } = req.params;
        const consultasMedicas = await ConsultaMedica.findAll({
            where: { mascota_id, habilitado: 1 },
            include: [
                { model: Veterinario, as: 'Veterinario' },
                { model: Mascota, as: 'Mascota' },
                { model: EstadoGeneral, as: 'EstadoGeneral' },
                { model: StatusMental, as: 'StatusMental' },
                { model: Temperamento, as: 'Temperamento' },
                { model: Comportamiento, as: 'Comportamiento' },
                { model: CondicionCorporal, as: 'CondicionCorporal' },
                { model: PatronFC, as: 'PatronFC' },
                { model: PatronFR, as: 'PatronFR' },
                { model: Pulso, as: 'Pulso' },
                { model: Mucosas, as: 'Mucosas' },
                { model: TiempoLlenadoCapilar, as: 'TiempoLlenadoCapilar' },
                { model: EstadoHidratacion, as: 'EstadoHidratacion' }
            ],
            order: [['fecha_consulta', 'ASC']]
        });
        res.status(200).json(consultasMedicas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener consultas médicas por mascota', error: error.message });
    }
};

exports.getConsultaMedicaByVeterinarioId = async (req, res) => {
    try {
        const { veterinario_id } = req.params;
        const consultasMedicas = await ConsultaMedica.findAll({
            where: { veterinario_id, habilitado: 1 },
            include: [
                { model: Veterinario, as: 'Veterinario' },
                { model: Mascota, as: 'Mascota' },
                { model: EstadoGeneral, as: 'EstadoGeneral' },
                { model: StatusMental, as: 'StatusMental' },
                { model: Temperamento, as: 'Temperamento' },
                { model: Comportamiento, as: 'Comportamiento' },
                { model: CondicionCorporal, as: 'CondicionCorporal' },
                { model: PatronFC, as: 'PatronFC' },
                { model: PatronFR, as: 'PatronFR' },
                { model: Pulso, as: 'Pulso' },
                { model: Mucosas, as: 'Mucosas' },
                { model: TiempoLlenadoCapilar, as: 'TiempoLlenadoCapilar' },
                { model: EstadoHidratacion, as: 'EstadoHidratacion' }
            ]
        });
        res.status(200).json(consultasMedicas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener consultas médicas por veterinario', error: error.message });
    }
};
