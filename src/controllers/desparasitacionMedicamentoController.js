const DesparasitacionMedicamento = require('../models/desparasitacionMedicamentoModel');

exports.crearDesparasitacionMedicamento = async (req, res) => {
    try {
        const { desparasitacion_id, medicamento_id, dosis, lote } = req.body;

        const nuevaDesparasitacionMedicamento = await DesparasitacionMedicamento.create({
            desparasitacion_id, medicamento_id, dosis, lote
        });

        res.status(201).json({ message: 'Desparasitacion-Medicamento creado', id: nuevaDesparasitacionMedicamento.id });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear Desparasitacion-Medicamento', error: error.message });
    }
};

exports.actualizarDesparasitacionMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { desparasitacion_id, medicamento_id, dosis, lote } = req.body;

        await DesparasitacionMedicamento.update({
            desparasitacion_id, medicamento_id, dosis, lote
        }, { where: { id } });

        res.status(200).json({ message: 'Desparasitacion-Medicamento actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar Desparasitacion-Medicamento', error: error.message });
    }
};

exports.eliminarDesparasitacionMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        await DesparasitacionMedicamento.update({ habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: 'Desparasitacion-Medicamento deshabilitado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al deshabilitar Desparasitacion-Medicamento', error: error.message });
    }
};

exports.listarDesparasitacionesMedicamentos = async (req, res) => {
    try {
        const desparasitacionesMedicamentos = await DesparasitacionMedicamento.findAll({
            where: { habilitado: 1 },
            include: [{ all: true }]
        });
        res.status(200).json(desparasitacionesMedicamentos);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar Desparasitaciones-Medicamentos', error: error.message });
    }
};
