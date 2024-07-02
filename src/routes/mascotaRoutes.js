const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', mascotaController.upload.single('Foto'), mascotaController.createMascota);
router.get('/', mascotaController.listarMascotas);
router.get('/:id', mascotaController.getMascota);
router.get('/propietario/:id', mascotaController.listarMascotasPorPropietario);
router.put('/:id', mascotaController.upload.single('Foto'), mascotaController.actualizarMascota);
router.put('/:id/disable', mascotaController.eliminarMascota);

module.exports = router;
