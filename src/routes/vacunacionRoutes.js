const express = require('express');
const router = express.Router();
const vacunacionController = require('../controllers/vacunacionController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', vacunacionController.getAllVacunacion);
router.post('/', vacunacionController.createVacunacion);
router.get('/:id', vacunacionController.getVacunacion);
router.get('/mascota/:mascota_id', vacunacionController.getVacunacionByMascotaId);
router.put('/:id', vacunacionController.updateVacunacion);
router.put('/:id/disable', vacunacionController.deleteVacunacion);

module.exports = router;
