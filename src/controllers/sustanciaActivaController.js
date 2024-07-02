const SustanciaActiva = require('../models/sustanciaActivaModel');

exports.listarSustanciasActivas = async (req, res) => {
    try {
        const sustanciasActivas = await SustanciaActiva.findAll({ where: { Habilitado: 1 } });
        res.status(200).json(sustanciasActivas);
    } catch (error) {
        res.status(500).json({ message: "Error al listar sustancias activas", error: error.message });
    }
};

exports.crearSustanciaActiva = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevaSustanciaActiva = await SustanciaActiva.create({ nombre });
        res.status(201).json(nuevaSustanciaActiva);
    } catch (error) {
        res.status(500).json({ message: "Error al crear sustancia activa", error: error.message });
    }
};

exports.editarSustanciaActiva = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        await SustanciaActiva.update({ nombre }, { where: { id } });
        res.status(200).json({ message: "Sustancia activa actualizada" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar sustancia activa", error: error.message });
    }
};

exports.eliminarSustanciaActiva = async (req, res) => {
    try {
        const { id } = req.params;
        await SustanciaActiva.update({ Habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Sustancia activa deshabilitada" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar sustancia activa", error: error.message });
    }
};
