const ExamenesMedicos = require('../models/examenesMedicosModel');

exports.getAllExamenesMedicos = async (req, res) => {
    try {
        const examenesMedicos = await ExamenesMedicos.findAll({ where: { habilitado: 1 } });
        res.status(200).json(examenesMedicos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener exámenes médicos', error: error.message });
    }
};

exports.getExamenMedicoById = async (req, res) => {
    try {
        const { id } = req.params;
        const examenMedico = await ExamenesMedicos.findByPk(id);
        if (!examenMedico) {
            return res.status(404).json({ message: 'Examen médico no encontrado' });
        }
        res.status(200).json(examenMedico);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener examen médico', error: error.message });
    }
};
