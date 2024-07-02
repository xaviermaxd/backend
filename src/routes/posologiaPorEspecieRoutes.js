const express = require('express');
const router = express.Router();
const posologiaController = require('../controllers/posologiaPorEspecieController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', posologiaController.listarPosologias);
router.post('/', posologiaController.createPosologia);
router.get('/:id', posologiaController.getPosologia);
router.put('/:id', posologiaController.actualizarPosologia);
router.put('/:id/disable', posologiaController.eliminarPosologia);
router.get('/medicamento/:medicamento_id', posologiaController.listarPosologiasPorMedicamento);


module.exports = router;
