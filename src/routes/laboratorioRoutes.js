const express = require('express');
const router = express.Router();
const laboratorioController = require('../controllers/laboratorioController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', laboratorioController.listarLaboratorios);
router.post('/', laboratorioController.crearLaboratorio);
router.put('/:id', laboratorioController.editarLaboratorio);
router.put('/:id/disable', laboratorioController.eliminarLaboratorio);

module.exports = router;
