const PresentacionesMedicamento = require('../models/presentacionesMedicamentoModel');
const Medicamento = require('../models/medicamentoModel');
const Presentacion = require('../models/presentacionModel');
const { Op } = require('sequelize');

exports.listarPresentacionesMedicamento = async (req, res) => {
    try {
        const medicamento = req.query.medicamento || '';
        const presentacion = req.query.presentacion || '';
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const offset = (page - 1) * pageSize;

        const presentacionesMedicamento = await PresentacionesMedicamento.findAll({
            where: {
                [Op.and]: [
                    { Habilitado: 1 },
                    { '$Medicamento.nombre$': { [Op.like]: `%${medicamento}%` } },
                    { '$Presentacion.nombre$': { [Op.like]: `%${presentacion}%` } }
                ]
            },
            include: [Medicamento, Presentacion],
            offset: offset,
            limit: pageSize
        });

        const totalItems = await PresentacionesMedicamento.count({
            where: {
                [Op.and]: [
                    { Habilitado: 1 },
                    { '$Medicamento.nombre$': { [Op.like]: `%${medicamento}%` } },
                    { '$Presentacion.nombre$': { [Op.like]: `%${presentacion}%` } }
                ]
            },
            include: [Medicamento, Presentacion]
        });

        res.status(200).json({
            data: presentacionesMedicamento,
            pagination: {
                totalItems: totalItems,
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(totalItems / pageSize)
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al listar las presentaciones del medicamento", error: error.message });
    }
};

exports.getPresentacionMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        const presentacionMedicamento = await PresentacionesMedicamento.findOne({
            where: { id, Habilitado: 1 },
            include: [Medicamento, Presentacion]
        });
        if (presentacionMedicamento) {
            res.status(200).json(presentacionMedicamento);
        } else {
            res.status(404).json({ message: "Presentación del medicamento no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la presentación del medicamento", error: error.message });
    }
};

exports.crearPresentacionMedicamento = async (req, res) => {
    try {
        const { medicamento_id, presentacion_id, unidades, concentracion } = req.body;
        const nuevaPresentacion = await PresentacionesMedicamento.create({ medicamento_id, presentacion_id, unidades, concentracion, habilitado: 1 });
        res.status(201).json({ message: "Presentación del medicamento creada", presentacionMedicamento: nuevaPresentacion });
      } catch (error) {
        res.status(500).json({ message: "Error al crear presentación del medicamento", error: error.message });
      }
};




exports.actualizarPresentacionMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { medicamento_id, presentacion_id, unidades, concentracion } = req.body;

        await PresentacionesMedicamento.update({
            medicamento_id, presentacion_id, unidades, concentracion
        }, {
            where: { id }
        });

        res.status(200).json({ message: "Presentación del medicamento actualizada" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la presentación del medicamento", error: error.message });
    }
};

exports.eliminarPresentacionMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        await PresentacionesMedicamento.update({ Habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Presentación del medicamento deshabilitada" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar la presentación del medicamento", error: error.message });
    }
};

exports.listarPresentacionesPorMedicamento = async (req, res) => {
    try {
        const { medicamento_id } = req.params;
        const presentaciones = await PresentacionesMedicamento.findAll({
            where: { medicamento_id, Habilitado: 1 },
            include: [Presentacion]
        });
        res.status(200).json(presentaciones);
    } catch (error) {
        res.status(500).json({ message: "Error al listar presentaciones por medicamento", error: error.message });
    }
};