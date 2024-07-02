const express = require('express');
const router = express.Router();
const desparasitacionMedicamentoController = require('../controllers/desparasitacionMedicamentoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', desparasitacionMedicamentoController.listarDesparasitacionesMedicamentos);
router.post('/', desparasitacionMedicamentoController.crearDesparasitacionMedicamento);
router.put('/:id', desparasitacionMedicamentoController.actualizarDesparasitacionMedicamento);
router.put('/:id/disable', desparasitacionMedicamentoController.eliminarDesparasitacionMedicamento);

module.exports = router;

