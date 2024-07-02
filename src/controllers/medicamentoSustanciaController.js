const MedicamentoSustancia = require('../models/medicamentoSustanciaModel');
const Medicamento = require('../models/medicamentoModel');
const SustanciaActiva = require('../models/sustanciaActivaModel');
const { Op } = require('sequelize');

exports.listarMedicamentoSustancias = async (req, res) => {
    try {
        const medicamento = req.query.medicamento || '';
        const sustancia = req.query.sustancia || '';
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const offset = (page - 1) * pageSize;

        const medicamentoSustancias = await MedicamentoSustancia.findAll({
            where: {
                [Op.and]: [
                    { Habilitado: 1 },
                    { '$Medicamento.nombre$': { [Op.like]: `%${medicamento}%` } },
                    { '$SustanciaActiva.nombre$': { [Op.like]: `%${sustancia}%` } }
                ]
            },
            include: [Medicamento, SustanciaActiva],
            offset: offset,
            limit: pageSize
        });

        const totalItems = await MedicamentoSustancia.count({
            where: {
                [Op.and]: [
                    { Habilitado: 1 },
                    { '$Medicamento.nombre$': { [Op.like]: `%${medicamento}%` } },
                    { '$SustanciaActiva.nombre$': { [Op.like]: `%${sustancia}%` } }
                ]
            },
            include: [Medicamento, SustanciaActiva]
        });

        res.status(200).json({
            data: medicamentoSustancias,
            pagination: {
                totalItems: totalItems,
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(totalItems / pageSize)
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al listar las relaciones entre medicamentos y sustancias activas", error: error.message });
    }
};

exports.getMedicamentoSustancia = async (req, res) => {
    try {
        const { id } = req.params;
        const medicamentoSustancia = await MedicamentoSustancia.findOne({
            where: { id, Habilitado: 1 },
            include: [Medicamento, SustanciaActiva]
        });
        if (medicamentoSustancia) {
            res.status(200).json(medicamentoSustancia);
        } else {
            res.status(404).json({ message: "Relación entre medicamento y sustancia activa no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la relación entre medicamento y sustancia activa", error: error.message });
    }
};

exports.crearMedicamentoSustancia = async (req, res) => {
    try {
        const { medicamento_id, sustancia_id } = req.body;

        const nuevaMedicamentoSustancia = await MedicamentoSustancia.create({
            medicamento_id, sustancia_id
        });

        res.status(201).json({ message: "Relación entre medicamento y sustancia activa creada", medicamentoSustancia: nuevaMedicamentoSustancia });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la relación entre medicamento y sustancia activa", error: error.message });
    }
};

exports.actualizarMedicamentoSustancia = async (req, res) => {
    try {
        const { id } = req.params;
        const { medicamento_id, sustancia_id } = req.body;

        await MedicamentoSustancia.update({
            medicamento_id, sustancia_id
        }, {
            where: { id }
        });

        res.status(200).json({ message: "Relación entre medicamento y sustancia activa actualizada" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la relación entre medicamento y sustancia activa", error: error.message });
    }
};

exports.eliminarMedicamentoSustancia = async (req, res) => {
    try {
        const { id } = req.params;
        await MedicamentoSustancia.update({ Habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Relación entre medicamento y sustancia activa deshabilitada" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar la relación entre medicamento y sustancia activa", error: error.message });
    }
};
