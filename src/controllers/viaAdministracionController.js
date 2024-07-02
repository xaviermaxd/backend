const ViaAdministracion = require('../models/viaAdministracionModel');

exports.listarViasAdministracion = async (req, res) => {
    try {
        const viasAdministracion = await ViaAdministracion.findAll({ where: { Habilitado: 1 } });
        res.status(200).json(viasAdministracion);
    } catch (error) {
        res.status(500).json({ message: "Error al listar vías de administración", error: error.message });
    }
};

exports.crearViaAdministracion = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevaViaAdministracion = await ViaAdministracion.create({ nombre });
        res.status(201).json(nuevaViaAdministracion);
    } catch (error) {
        res.status(500).json({ message: "Error al crear vía de administración", error: error.message });
    }
};

exports.editarViaAdministracion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        await ViaAdministracion.update({ nombre }, { where: { id } });
        res.status(200).json({ message: "Vía de administración actualizada" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar vía de administración", error: error.message });
    }
};

exports.eliminarViaAdministracion = async (req, res) => {
    try {
        const { id } = req.params;
        await ViaAdministracion.update({ Habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Vía de administración deshabilitada" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar vía de administración", error: error.message });
    }
};
