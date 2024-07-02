const MotivoConsulta = require('../models/motivoConsultaModel');
const ConsultaMedica = require('../models/consultaMedicaModel');

exports.getAllMotivoConsulta = async (req, res) => {
    try {
        const motivoConsultas = await MotivoConsulta.findAll({
            include: [
                { model: ConsultaMedica }
            ]
        });
        res.status(200).json(motivoConsultas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener motivos de consulta', error: error.message });
    }
};

exports.getByIdConsultaMedica = async (req, res) => {
    try {
        const { consulta_medica_id } = req.params;
        const motivoConsultas = await MotivoConsulta.findAll({
            where: { consulta_medica_id, habilitado: 1 },
            include: [
                { model: ConsultaMedica }
            ]
        });
        res.status(200).json(motivoConsultas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener motivo de consulta por id de consulta médica', error: error.message });
    }
};

exports.createMotivoConsulta = async (req, res) => {
    try {
        const newMotivoConsulta = await MotivoConsulta.create(req.body);
        res.status(201).json(newMotivoConsulta);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear motivo de consulta', error: error.message });
    }
};

exports.updateMotivoConsulta = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMotivoConsulta = await MotivoConsulta.update(req.body, { where: { id } });
        res.status(200).json(updatedMotivoConsulta);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar motivo de consulta', error: error.message });
    }
};

exports.deleteMotivoConsulta = async (req, res) => {
    try {
        const { id } = req.params;
        await MotivoConsulta.update({ habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: 'Motivo de consulta deshabilitado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al deshabilitar motivo de consulta', error: error.message });
    }
};
