const express = require('express');
const router = express.Router();
const medicamentoSustanciaController = require('../controllers/medicamentoSustanciaController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', medicamentoSustanciaController.listarMedicamentoSustancias);
router.post('/', medicamentoSustanciaController.crearMedicamentoSustancia);
router.get('/:id', medicamentoSustanciaController.getMedicamentoSustancia);
router.put('/:id', medicamentoSustanciaController.actualizarMedicamentoSustancia);
router.put('/:id/disable', medicamentoSustanciaController.eliminarMedicamentoSustancia);

module.exports = router;
