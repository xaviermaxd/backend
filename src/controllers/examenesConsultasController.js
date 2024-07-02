const { sequelize } = require('../config/db');
const ExamenesConsultas = require('../models/examenesConsultasModel');
const ConsultaMedica = require('../models/consultaMedicaModel');
const ExamenesMedicos = require('../models/examenesMedicosModel');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../akfotos'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Crear el middleware de multer
const upload = multer({ storage: storage });

exports.upload = upload;

exports.getAllExamenesConsultas = async (req, res) => {
    try {
        const examenesConsultas = await ExamenesConsultas.findAll({
            include: [
                { model: ConsultaMedica },
                { model: ExamenesMedicos }
            ]
        });
        res.status(200).json(examenesConsultas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener lista de exámenes de consultas', error: error.message });
    }
};

exports.getByIdConsultaMedica = async (req, res) => {
    try {
        const { consulta_medica_id } = req.params;
        const examenesConsultas = await ExamenesConsultas.findAll({
            where: { consulta_medica_id, habilitado: 1 },
            include: [
                { model: ConsultaMedica },
                { model: ExamenesMedicos }
            ]
        });
        res.status(200).json(examenesConsultas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener lista de exámenes de consultas por id de consulta médica', error: error.message });
    }
};

exports.createExamenesConsultas = async (req, res) => {
    try {
        const newExamenesConsultas = await ExamenesConsultas.create(req.body);
        res.status(201).json(newExamenesConsultas);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear examen de consulta', error: error.message });
    }
};

exports.updateExamenesConsultas = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedExamenesConsultas = await ExamenesConsultas.update(req.body, { where: { id } });
        res.status(200).json(updatedExamenesConsultas);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar examen de consulta', error: error.message });
    }
};

exports.deleteExamenesConsultas = async (req, res) => {
    try {
        const { id } = req.params;
        await ExamenesConsultas.update({ habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: 'Examen de consulta deshabilitado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al deshabilitar examen de consulta', error: error.message });
    }
};

exports.getExamenesConsultasByFecha = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;

    try {
        const examenesConsultas = await sequelize.query(`
            SELECT e.nombre, COUNT(*) as count
            FROM examenesconsultas ec
            JOIN consultamedica cm ON ec.consulta_medica_id = cm.id
            JOIN examenesmedicos e ON ec.examen_medico_id = e.id
            WHERE cm.fecha_consulta BETWEEN :fechaInicio AND :fechaFin
            GROUP BY e.nombre
        `, {
            replacements: { fechaInicio, fechaFin },
            type: sequelize.QueryTypes.SELECT
        });

        res.status(200).json(examenesConsultas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener lista de exámenes de consultas', error: error.message });
    }
};

exports.uploadInforme = async (req, res) => {
    try {
        const { id } = req.params;
        const informe = req.files?.informe?.[0]?.filename;

        if (!informe) {
            return res.status(400).json({ message: 'Informe no proporcionado' });
        }

        const updatedExamenesConsultas = await ExamenesConsultas.update(
            { informe },
            { where: { id } }
        );

        res.status(200).json(updatedExamenesConsultas);
    } catch (error) {
        res.status(500).json({ message: 'Error al cargar el informe', error: error.message });
    }
};