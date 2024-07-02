const express = require('express');
const router = express.Router();
const especieController = require('../controllers/especieController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', especieController.listarEspecies);
router.post('/', especieController.crearEspecie);
router.put('/:id', especieController.editarEspecie);
router.put('/:id/disable', especieController.eliminarEspecie);

module.exports = router;
