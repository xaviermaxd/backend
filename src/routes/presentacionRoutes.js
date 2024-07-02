const express = require('express');
const router = express.Router();
const presentacionController = require('../controllers/presentacionController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', presentacionController.listarPresentaciones);
router.post('/', presentacionController.crearPresentacion);
router.put('/:id', presentacionController.editarPresentacion);
router.put('/:id/disable', presentacionController.eliminarPresentacion);

module.exports = router;
