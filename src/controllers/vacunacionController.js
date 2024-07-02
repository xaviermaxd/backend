const Vacunacion = require('../models/vacunacionModel');
const Mascota = require('../models/mascotaModel');
const Veterinario = require('../models/veterinarioModel');

exports.createVacunacion = async (req, res) => {
    try {
        const { fecha_aplicacion, peso, frecuencia_cardiaca, frecuencia_respiratoria, temperatura, recordatorio, fecha_proxima_visita, mascota_id, veterinario_id } = req.body;
        const newRecord = await Vacunacion.create({ fecha_aplicacion, peso, frecuencia_cardiaca, frecuencia_respiratoria, temperatura, recordatorio, fecha_proxima_visita, mascota_id, veterinario_id });
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el registro", error: error.message });
    }
};

exports.getAllVacunacion = async (req, res) => {
    try {
        const records = await Vacunacion.findAll({
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

exports.getVacunacion = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Vacunacion.findOne({
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

exports.updateVacunacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_aplicacion, peso, frecuencia_cardiaca, frecuencia_respiratoria, temperatura, recordatorio, fecha_proxima_visita, mascota_id, veterinario_id, habilitado } = req.body;
        const updatedRecord = await Vacunacion.update({ fecha_aplicacion, peso, frecuencia_cardiaca, frecuencia_respiratoria, temperatura, recordatorio, fecha_proxima_visita, mascota_id, veterinario_id, habilitado }, { where: { id } });
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el registro", error: error.message });
    }
};

exports.deleteVacunacion = async (req, res) => {
    try {
        const { id } = req.params;
        await Vacunacion.update({ habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: "Registro deshabilitado" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar el registro", error: error.message });
    }
};

exports.getVacunacionByMascotaId = async (req, res) => {
    try {
        const { mascota_id } = req.params;
        const records = await Vacunacion.findAll({
            where: { mascota_id, habilitado: 1 },
            include: [
                { model: Mascota, as: 'Mascota' },
                { model: Veterinario, as: 'Veterinario' }
            ],
            order: [['fecha_aplicacion', 'ASC']]
        });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las vacunaciones de la mascota", error: error.message });
    }
};

