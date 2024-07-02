const express = require('express');
const router = express.Router();
const examenesConsultasController = require('../controllers/examenesConsultasController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', examenesConsultasController.getAllExamenesConsultas);
router.get('/consultaMedica/:consulta_medica_id', examenesConsultasController.getByIdConsultaMedica);
router.get('/fecha', examenesConsultasController.getExamenesConsultasByFecha);
router.post('/', examenesConsultasController.createExamenesConsultas);
router.put('/:id', examenesConsultasController.updateExamenesConsultas);
router.put('/:id/disable', examenesConsultasController.deleteExamenesConsultas);
router.put('/:id/upload', examenesConsultasController.upload.fields([{ name: 'informe' }]), examenesConsultasController.uploadInforme); // Nueva ruta para la carga de informes

module.exports = router;
