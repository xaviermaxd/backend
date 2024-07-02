const express = require('express');
const router = express.Router();
const vacunacionMedicamentoController = require('../controllers/vacunacionMedicamentoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', vacunacionMedicamentoController.listarVacunacionesMedicamentos);
router.post('/', vacunacionMedicamentoController.crearVacunacionMedicamento);
router.get('/:id/medicamentos', vacunacionMedicamentoController.getMedicamentosPorVacunacionId);
router.put('/:id', vacunacionMedicamentoController.actualizarVacunacionMedicamento);
router.put('/:id/disable', vacunacionMedicamentoController.eliminarVacunacionMedicamento);

module.exports = router;
