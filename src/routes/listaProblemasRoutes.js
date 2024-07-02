const express = require('express');
const router = express.Router();
const listaProblemasController = require('../controllers/listaProblemasController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', listaProblemasController.getAllListaProblemas);
router.get('/consultaMedica/:consulta_medica_id', listaProblemasController.getByIdConsultaMedica);
router.get('/fecha', listaProblemasController.getListaProblemasByFecha);
router.post('/', listaProblemasController.createListaProblemas);
router.put('/:id', listaProblemasController.updateListaProblemas);
router.put('/:id/disable', listaProblemasController.deleteListaProblemas);

module.exports = router;
