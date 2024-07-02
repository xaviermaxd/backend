const express = require('express');
const router = express.Router();
const historialClinicoController = require('../controllers/historialClinicoController');
const authMiddleware = require('../middleware/authMiddleware');

// Aplica el middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Ruta para crear un nuevo historial clínico
router.post('/', historialClinicoController.createHistorialClinico);

// Ruta para listar los historiales clínicos de una mascota con paginación y filtros de fecha
//router.get('/:mascotaId', historialClinicoController.listarHistorialesClinicos);

// Ruta para actualizar un historial clínico existente
router.put('/:id', historialClinicoController.actualizarHistorialClinico);

// Ruta para deshabilitar un historial clínico (eliminación lógica)
router.put('/:id/disable', historialClinicoController.eliminarHistorialClinico);

router.get('/mascota/:mascotaId', historialClinicoController.listarHistorialesClinicos);

router.get('/:id', historialClinicoController.obtenerHistorialClinico);

module.exports = router;
