const VacunacionMedicamento = require('../models/vacunacionMedicamentoModel');

exports.crearVacunacionMedicamento = async (req, res) => {
    try {
        const { vacunacion_id, medicamento_id, lote, dosis } = req.body;

        const nuevaVacunacionMedicamento = await VacunacionMedicamento.create({
            vacunacion_id, medicamento_id, lote, dosis
        });

        res.status(201).json({ message: 'Vacunacion-Medicamento creado', id: nuevaVacunacionMedicamento.id });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear Vacunacion-Medicamento', error: error.message });
    }
};

exports.actualizarVacunacionMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { vacunacion_id, medicamento_id, dosis, lote } = req.body;

        await VacunacionMedicamento.update({
            vacunacion_id, medicamento_id, dosis, lote
        }, { where: { id } });

        res.status(200).json({ message: 'Vacunacion-Medicamento actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar Vacunacion-Medicamento', error: error.message });
    }
};

exports.eliminarVacunacionMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        await VacunacionMedicamento.update({ habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: 'Vacunacion-Medicamento deshabilitado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al deshabilitar Vacunacion-Medicamento', error: error.message });
    }
};

exports.listarVacunacionesMedicamentos = async (req, res) => {
    try {
        const vacunacionesMedicamentos = await VacunacionMedicamento.findAll({
            where: { habilitado: 1 },
            include: [{ all: true }]
        });
        res.status(200).json(vacunacionesMedicamentos);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar Vacunaciones-Medicamentos', error: error.message });
    }
};

exports.getMedicamentosPorVacunacionId = async (req, res) => {
    try {
        const { id } = req.params;
        const medicamentos = await VacunacionMedicamento.findAll({
            where: { vacunacion_id: id, habilitado: 1 },
            include: [{ all: true }]
        });
        res.status(200).json(medicamentos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener medicamentos por ID de vacunación', error: error.message });
    }
};