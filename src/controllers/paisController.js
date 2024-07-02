const Pais = require('../models/paisModel');

exports.listarPaises = async (req, res) => {
    try {
        const paises = await Pais.findAll({ where: { Habilitado: 1 } });
        res.status(200).json(paises);
    } catch (error) {
        res.status(500).json({ message: "Error al listar paises", error: error.message });
    }
};

exports.crearPais = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevoPais = await Pais.create({ nombre });
        res.status(201).json(nuevoPais);
    } catch (error) {
        res.status(500).json({ message: "Error al crear pais", error: error.message });
    }
};

exports.editarPais = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        await Pais.update({ nombre }, { where: { id } });
        res.status(200).json({ message: "Pais actualizado" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar pais", error: error.message });
    }
};

exports.eliminarPais = async (req, res) => {
    try {
        const { id } = req.params;
        await Pais.update({ Habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Pais deshabilitado" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar pais", error: error.message });
    }
};
