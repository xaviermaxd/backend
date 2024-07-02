const express = require('express');
const router = express.Router();
const presentacionesMedicamentoController = require('../controllers/presentacionesMedicamentoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', presentacionesMedicamentoController.listarPresentacionesMedicamento);
router.post('/', presentacionesMedicamentoController.crearPresentacionMedicamento);
router.get('/:id', presentacionesMedicamentoController.getPresentacionMedicamento);
router.put('/:id', presentacionesMedicamentoController.actualizarPresentacionMedicamento);
router.put('/:id/disable', presentacionesMedicamentoController.eliminarPresentacionMedicamento);
router.get('/medicamento/:medicamento_id', presentacionesMedicamentoController.listarPresentacionesPorMedicamento);

module.exports = router;
