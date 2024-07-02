const express = require('express');
const router = express.Router();
const paisController = require('../controllers/paisController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', paisController.listarPaises);
router.post('/', paisController.crearPais);
router.put('/:id', paisController.editarPais);
router.put('/:id/disable', paisController.eliminarPais);

module.exports = router;
