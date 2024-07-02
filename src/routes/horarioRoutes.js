// horarioRoutes.js
const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Rutas CRUD para Horarios
router.post('/', horarioController.createHorario);
router.get('/', horarioController.listarHorarios);
router.get('/:id', horarioController.getHorario);
router.put('/:id', horarioController.actualizarHorario);
router.delete('/:id', horarioController.eliminarHorario);

module.exports = router;
