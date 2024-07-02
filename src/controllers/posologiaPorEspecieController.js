const PosologiaPorEspecie = require('../models/posologiaPorEspecieModel');
const Medicamento = require('../models/medicamentoModel');
const Especie = require('../models/especieModel');
const { Op } = require('sequelize');

exports.listarPosologias = async (req, res) => {
    try {
        const medicamento = req.query.medicamento || '';
        const especie = req.query.especie || '';
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const offset = (page - 1) * pageSize;

        const posologias = await PosologiaPorEspecie.findAll({
            where: {
                [Op.and]: [
                    { Habilitado: 1 },
                    { '$Medicamento.nombre$': { [Op.like]: `%${medicamento}%` } },
                    { '$Especie.nombre$': { [Op.like]: `%${especie}%` } }
                ]
            },
            include: [Medicamento, Especie],
            offset: offset,
            limit: pageSize
        });

        const totalItems = await PosologiaPorEspecie.count({
            where: {
                [Op.and]: [
                    { Habilitado: 1 },
                    { '$Medicamento.nombre$': { [Op.like]: `%${medicamento}%` } },
                    { '$Especie.nombre$': { [Op.like]: `%${especie}%` } }
                ]
            },
            include: [Medicamento, Especie]
        });

        res.status(200).json({
            data: posologias,
            pagination: {
                totalItems: totalItems,
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(totalItems / pageSize)
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al listar posologías", error: error.message });
    }
};

exports.getPosologia = async (req, res) => {
    try {
        const { id } = req.params;
        const posologia = await PosologiaPorEspecie.findOne({
            where: { id, Habilitado: 1 },
            include: [Medicamento, Especie]
        });
        if (posologia) {
            res.status(200).json(posologia);
        } else {
            res.status(404).json({ message: "Posología no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener posología", error: error.message });
    }
};


exports.createPosologia = async (req, res) => {
  try {
    const { medicamento_id, especie_id, dosificacion } = req.body;
    const nuevaPosologia = await PosologiaPorEspecie.create({ medicamento_id, especie_id, dosificacion, habilitado: 1 });
    res.status(201).json({ message: "Posología creada", posologia: nuevaPosologia });
  } catch (error) {
    res.status(500).json({ message: "Error al crear posología", error: error.message });
  }
};


exports.actualizarPosologia = async (req, res) => {
    try {
        const { id } = req.params;
        const { medicamento_id, especie_id, dosificacion } = req.body;

        await PosologiaPorEspecie.update({
            medicamento_id, especie_id, dosificacion
        }, {
            where: { id }
        });

        res.status(200).json({ message: "Posología actualizada" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar posología", error: error.message });
    }
};

exports.eliminarPosologia = async (req, res) => {
    try {
        const { id } = req.params;
        await PosologiaPorEspecie.update({ Habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Posología deshabilitada" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar posología", error: error.message });
    }
};


exports.listarPosologiasPorMedicamento = async (req, res) => {
    try {
        const { medicamento_id } = req.params;
        const posologias = await PosologiaPorEspecie.findAll({
            where: { medicamento_id, Habilitado: 1 },
            include: [Especie]
        });
        res.status(200).json(posologias);
    } catch (error) {
        res.status(500).json({ message: "Error al listar posologías por medicamento", error: error.message });
    }
};