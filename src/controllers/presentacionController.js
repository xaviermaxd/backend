const Presentacion = require('../models/presentacionModel');

exports.listarPresentaciones = async (req, res) => {
    try {
        const presentaciones = await Presentacion.findAll({ where: { Habilitado: 1 } });
        res.status(200).json(presentaciones);
    } catch (error) {
        res.status(500).json({ message: "Error al listar presentaciones", error: error.message });
    }
};

exports.crearPresentacion = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevaPresentacion = await Presentacion.create({ nombre });
        res.status(201).json(nuevaPresentacion);
    } catch (error) {
        res.status(500).json({ message: "Error al crear presentación", error: error.message });
    }
};

exports.editarPresentacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        await Presentacion.update({ nombre }, { where: { id } });
        res.status(200).json({ message: "Presentación actualizada" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar presentación", error: error.message });
    }
};

exports.eliminarPresentacion = async (req, res) => {
    try {
        const { id } = req.params;
        await Presentacion.update({ Habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Presentación deshabilitada" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar presentación", error: error.message });
    }
};
