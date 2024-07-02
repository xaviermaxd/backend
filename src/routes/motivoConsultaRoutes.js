const express = require('express');
const router = express.Router();
const motivoConsultaController = require('../controllers/motivoConsultaController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', motivoConsultaController.getAllMotivoConsulta);
router.get('/consultaMedica/:consulta_medica_id', motivoConsultaController.getByIdConsultaMedica);
router.post('/', motivoConsultaController.createMotivoConsulta);
router.put('/:id', motivoConsultaController.updateMotivoConsulta);
router.put('/:id/disable', motivoConsultaController.deleteMotivoConsulta);

module.exports = router;
