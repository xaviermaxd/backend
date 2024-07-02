const express = require('express');
const router = express.Router();
const viaAdministracionController = require('../controllers/viaAdministracionController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', viaAdministracionController.listarViasAdministracion);
router.post('/', viaAdministracionController.crearViaAdministracion);
router.put('/:id', viaAdministracionController.editarViaAdministracion);
router.put('/:id/disable', viaAdministracionController.eliminarViaAdministracion);

module.exports = router;
