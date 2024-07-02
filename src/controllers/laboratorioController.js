const Laboratorio = require('../models/laboratorioModel');

exports.listarLaboratorios = async (req, res) => {
    try {
        const laboratorios = await Laboratorio.findAll({ where: { Habilitado: 1 } });
        res.status(200).json(laboratorios);
    } catch (error) {
        res.status(500).json({ message: "Error al listar laboratorios", error: error.message });
    }
};

exports.crearLaboratorio = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevoLaboratorio = await Laboratorio.create({ nombre });
        res.status(201).json(nuevoLaboratorio);
    } catch (error) {
        res.status(500).json({ message: "Error al crear laboratorio", error: error.message });
    }
};

exports.editarLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        await Laboratorio.update({ nombre }, { where: { id } });
        res.status(200).json({ message: "Laboratorio actualizado" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar laboratorio", error: error.message });
    }
};

exports.eliminarLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        await Laboratorio.update({ Habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Laboratorio deshabilitado" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar laboratorio", error: error.message });
    }
};
