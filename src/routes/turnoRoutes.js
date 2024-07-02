const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Rutas CRUD para Turnos
router.post('/', turnoController.createTurno);
router.get('/', turnoController.listarTurnos);
router.get('/:id', turnoController.getTurno);
router.put('/:id', turnoController.actualizarTurno);
router.delete('/:id', turnoController.eliminarTurno);

module.exports = router;
