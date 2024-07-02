const express = require('express');
const router = express.Router();
const estadoHidratacionController = require('../controllers/estadoHidratacionController');

router.get('/', estadoHidratacionController.getAllEstadoHidratacion);

module.exports = router;
