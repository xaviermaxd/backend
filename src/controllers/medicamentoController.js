const Medicamento = require('../models/medicamentoModel');
const Laboratorio = require('../models/laboratorioModel');
const Pais = require('../models/paisModel');
const ViaAdministracion = require('../models/viaAdministracionModel');
const SustanciaActiva = require('../models/sustanciaActivaModel');
const UsoTerapeutico = require('../models/usoTerapeuticoModel');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');

// Configurar almacenamiento de multer
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

exports.listarMedicamentos = async (req, res) => {
    try {
        const nombre = req.query.nombre || '';
        const laboratorio = req.query.laboratorio || '';
        const usoTerapeutico = req.query.usoTerapeutico || '';
        const viaAdministracion = req.query.viaAdministracion || '';
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const offset = (page - 1) * pageSize;

        const medicamentos = await Medicamento.findAll({
            where: {
                [Op.and]: [
                    { Habilitado: 1 },
                    { nombre: { [Op.like]: `%${nombre}%` } },
                    { '$Laboratorio.nombre$': { [Op.like]: `%${laboratorio}%` } },
                    { '$UsoTerapeutico.nombre$': { [Op.like]: `%${usoTerapeutico}%` } },
                    { '$ViaAdministracion.nombre$': { [Op.like]: `%${viaAdministracion}%` } },
                ]
            },
            include: [
                { model: Laboratorio, as: 'Laboratorio' },
                { model: Pais, as: 'Pais' },
                { model: ViaAdministracion, as: 'ViaAdministracion' },
                { model: SustanciaActiva, as: 'SustanciaActiva' },
                { model: UsoTerapeutico, as: 'UsoTerapeutico' }
            ],
            offset: offset,
            limit: pageSize
        });

        const totalItems = await Medicamento.count({
            where: {
                [Op.and]: [
                    { Habilitado: 1 },
                    { nombre: { [Op.like]: `%${nombre}%` } },
                    { '$Laboratorio.nombre$': { [Op.like]: `%${laboratorio}%` } },
                    { '$UsoTerapeutico.nombre$': { [Op.like]: `%${usoTerapeutico}%` } },
                    { '$ViaAdministracion.nombre$': { [Op.like]: `%${viaAdministracion}%` } },
                ],
            },
            include: [
                { model: Laboratorio, as: 'Laboratorio' },
                { model: Pais, as: 'Pais' },
                { model: ViaAdministracion, as: 'ViaAdministracion' },
                { model: SustanciaActiva, as: 'SustanciaActiva' },
                { model: UsoTerapeutico, as: 'UsoTerapeutico' }
            ]
        });

        res.status(200).json({
            data: medicamentos,
            pagination: {
                totalItems: totalItems,
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(totalItems / pageSize)
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al listar medicamentos", error: error.message });
    }
};

exports.getMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        const medicamento = await Medicamento.findOne({
            where: { id, Habilitado: 1 },
            include: [
                { model: Laboratorio, as: 'Laboratorio' },
                { model: Pais, as: 'Pais' },
                { model: ViaAdministracion, as: 'ViaAdministracion' },
                { model: SustanciaActiva, as: 'SustanciaActiva' },
                { model: UsoTerapeutico, as: 'UsoTerapeutico' }
            ]
        });
        if (medicamento) {
            res.status(200).json(medicamento);
        } else {
            res.status(404).json({ message: "Medicamento no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener medicamento", error: error.message });
    }
};


exports.crearMedicamento = async (req, res) => {
    try {
        const { nombre, laboratorio_id, pais_id, registro_sanitario, composicion, indicaciones, contraindicaciones, precauciones, reacciones_adversas, via_administracion_id, sustancia_id, uso_terapeutico_id, url } = req.body;
        const foto = req.files?.foto?.[0]?.filename || 'default.png';
        const documento = req.files?.documento?.[0]?.filename || null;

        const nuevoMedicamento = await Medicamento.create({
            nombre, laboratorio_id, pais_id, registro_sanitario, composicion, indicaciones, contraindicaciones, precauciones, reacciones_adversas, via_administracion_id, sustancia_id, uso_terapeutico_id, url, foto, documento
        });

        res.status(201).json({ message: "Medicamento creado", id: nuevoMedicamento.id }); 
    } catch (error) {
        res.status(500).json({ message: "Error al crear medicamento", error: error.message });
    }
};

exports.actualizarMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, laboratorio_id, pais_id, registro_sanitario, composicion, indicaciones, contraindicaciones, precauciones, reacciones_adversas, via_administracion_id, sustancia_id, uso_terapeutico_id, url } = req.body;

        const medicamentoExistente = await Medicamento.findOne({ where: { id } });

        const foto = req.files?.foto?.[0]?.filename || medicamentoExistente.foto;
        const documento = req.files?.documento?.[0]?.filename || medicamentoExistente.documento;

        await Medicamento.update({
            nombre, laboratorio_id, pais_id, registro_sanitario, composicion, indicaciones, contraindicaciones, precauciones, reacciones_adversas, via_administracion_id, sustancia_id, uso_terapeutico_id, url, foto, documento
        }, {
            where: { id }
        });

        res.status(200).json({ message: "Medicamento actualizado" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar medicamento", error: error.message });
    }
};

exports.eliminarMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        await Medicamento.update({ Habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Medicamento deshabilitado" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar medicamento", error: error.message });
    }
};
