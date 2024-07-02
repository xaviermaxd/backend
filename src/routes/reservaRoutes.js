// const express = require('express');
// const router = express.Router();
// const reservaController = require('../controllers/reservaController');
// const authMiddleware = require('../middleware/authMiddleware');

// router.use(authMiddleware);

// // Rutas CRUD para Reservas
// router.post('/', reservaController.createReserva);
// router.get('/', reservaController.listarReservas);
// router.get('/:id', reservaController.getReserva);
// router.put('/:id', reservaController.actualizarReserva);
// router.delete('/:id', reservaController.eliminarReserva);
// router.get('/estadisticas', reservaController.obtenerEstadisticasReservas); 


// module.exports = router;

const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Rutas CRUD para Reservas
router.post('/', reservaController.createReserva);
router.get('/', reservaController.listarReservas);
router.get('/estadisticas', reservaController.obtenerEstadisticasReservas);  // Nueva ruta para estadísticas
router.get('/:id', reservaController.getReserva);
router.put('/:id', reservaController.actualizarReserva);
router.delete('/:id', reservaController.eliminarReserva);

module.exports = router;
