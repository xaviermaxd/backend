const express = require('express');
const router = express.Router();
const usoTerapeuticoController = require('../controllers/usoTerapeuticoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', usoTerapeuticoController.listarUsosTerapeuticos);
router.post('/', usoTerapeuticoController.crearUsoTerapeutico);
router.put('/:id', usoTerapeuticoController.editarUsoTerapeutico);
router.put('/:id/disable', usoTerapeuticoController.eliminarUsoTerapeutico);

module.exports = router;
