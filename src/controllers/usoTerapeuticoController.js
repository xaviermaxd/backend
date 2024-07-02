const UsoTerapeutico = require('../models/usoTerapeuticoModel');

exports.listarUsosTerapeuticos = async (req, res) => {
    try {
        const usosTerapeuticos = await UsoTerapeutico.findAll({ where: { Habilitado: 1 } });
        res.status(200).json(usosTerapeuticos);
    } catch (error) {
        res.status(500).json({ message: "Error al listar usos terapéuticos", error: error.message });
    }
};

exports.crearUsoTerapeutico = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevoUsoTerapeutico = await UsoTerapeutico.create({ nombre });
        res.status(201).json(nuevoUsoTerapeutico);
    } catch (error) {
        res.status(500).json({ message: "Error al crear uso terapéutico", error: error.message });
    }
};

exports.editarUsoTerapeutico = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        await UsoTerapeutico.update({ nombre }, { where: { id } });
        res.status(200).json({ message: "Uso terapéutico actualizado" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar uso terapéutico", error: error.message });
    }
};

exports.eliminarUsoTerapeutico = async (req, res) => {
    try {
        const { id } = req.params;
        await UsoTerapeutico.update({ Habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Uso terapéutico deshabilitado" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar uso terapéutico", error: error.message });
    }
};
