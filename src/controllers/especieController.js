const Especie = require('../models/especieModel');

exports.listarEspecies = async (req, res) => {
    try {
        const especies = await Especie.findAll({ where: { Habilitado: 1 } });
        res.status(200).json(especies);
    } catch (error) {
        res.status(500).json({ message: "Error al listar especies", error: error.message });
    }
};

exports.crearEspecie = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevaEspecie = await Especie.create({ nombre });
        res.status(201).json(nuevaEspecie);
    } catch (error) {
        res.status(500).json({ message: "Error al crear especie", error: error.message });
    }
};

exports.editarEspecie = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        await Especie.update({ nombre }, { where: { id } });
        res.status(200).json({ message: "Especie actualizada" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar especie", error: error.message });
    }
};

exports.eliminarEspecie = async (req, res) => {
    try {
        const { id } = req.params;
        await Especie.update({ Habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Especie deshabilitada" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar especie", error: error.message });
    }
};
