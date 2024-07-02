const Desparasitacion = require('../models/desparasitacionModel');
const Mascota = require('../models/mascotaModel');
const Veterinario = require('../models/veterinarioModel');

exports.createDesparasitacion = async (req, res) => {
    try {
        const { fecha_aplicacion, peso, recordatorio, fecha_proxima_visita, mascota_id, veterinario_id } = req.body;
        const newRecord = await Desparasitacion.create({ fecha_aplicacion, peso, recordatorio, fecha_proxima_visita, mascota_id, veterinario_id });
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el registro", error: error.message });
    }
};

exports.getAllDesparasitacion = async (req, res) => {
    try {
        const records = await Desparasitacion.findAll({
            include: [
                { model: Mascota, as: 'Mascota' },
                { model: Veterinario, as: 'Veterinario' }
            ]
        });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los registros", error: error.message });
    }
};

exports.getDesparasitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Desparasitacion.findOne({
            where: { id },
            include: [
                { model: Mascota, as: 'Mascota' },
                { model: Veterinario, as: 'Veterinario' }
            ]
        });
        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).json({ message: "Registro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el registro", error: error.message });
    }
};

exports.updateDesparasitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_aplicacion, peso, recordatorio, fecha_proxima_visita, mascota_id, veterinario_id, habilitado } = req.body;
        const updatedRecord = await Desparasitacion.update({ fecha_aplicacion, peso, recordatorio, fecha_proxima_visita, mascota_id, veterinario_id, habilitado }, { where: { id } });
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el registro", error: error.message });
    }
};

exports.deleteDesparasitacion = async (req, res) => {
    try {
        const { id } = req.params;
        await Desparasitacion.update({ habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Registro deshabilitado" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar el registro", error: error.message });
    }
};

exports.getDesparasitacionByMascotaId = async (req, res) => {
    try {
        const { mascota_id } = req.params;
        const records = await Desparasitacion.findAll({
            where: { mascota_id, habilitado: 1 },
            include: [
                { model: Mascota, as: 'Mascota' },
                { model: Veterinario, as: 'Veterinario' }
            ],
            order: [['fecha_aplicacion', 'ASC']]
        });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las desparasitaciones de la mascota", error: error.message });
    }
};
