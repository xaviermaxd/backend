const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', medicamentoController.listarMedicamentos);
router.post('/', medicamentoController.upload.fields([{ name: 'foto' }, { name: 'documento' }]), medicamentoController.crearMedicamento);
router.get('/:id', medicamentoController.getMedicamento);
router.put('/:id', medicamentoController.upload.fields([{ name: 'foto' }, { name: 'documento' }]), medicamentoController.actualizarMedicamento);
router.put('/:id/disable', medicamentoController.eliminarMedicamento);

module.exports = router;
