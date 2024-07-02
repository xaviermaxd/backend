const express = require('express');
const router = express.Router();
const consultaMedicaController = require('../controllers/consultaMedicaController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', consultaMedicaController.getAllConsultaMedica);
router.post('/', consultaMedicaController.createConsultaMedica);
router.get('/:id', consultaMedicaController.getConsultaMedicaById);
router.get('/mascota/:mascota_id', consultaMedicaController.getConsultaMedicaByMascotaId);
router.get('/veterinario/:veterinario_id', consultaMedicaController.getConsultaMedicaByVeterinarioId);
router.put('/:id', consultaMedicaController.updateConsultaMedica);
router.put('/:id/disable', consultaMedicaController.deleteConsultaMedica);

module.exports = router;
