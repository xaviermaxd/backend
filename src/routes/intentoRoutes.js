// intentoReservaRoutes.js
const express = require('express');
const router = express.Router();
const intentoController = require('../controllers/intentoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Rutas CRUD para IntentosReserva
router.post('/', intentoController.createIntentoReserva);
router.get('/', intentoController.listarIntentosReserva);
router.get('/:id', intentoController.getIntentoReserva);
router.put('/:id', intentoController.actualizarIntentoReserva);
router.delete('/:id', intentoController.eliminarIntentoReserva);

module.exports = router;
