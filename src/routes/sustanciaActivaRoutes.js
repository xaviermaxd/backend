const express = require('express');
const router = express.Router();
const sustanciaActivaController = require('../controllers/sustanciaActivaController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', sustanciaActivaController.listarSustanciasActivas);
router.post('/', sustanciaActivaController.crearSustanciaActiva);
router.put('/:id', sustanciaActivaController.editarSustanciaActiva);
router.put('/:id/disable', sustanciaActivaController.eliminarSustanciaActiva);

module.exports = router;
