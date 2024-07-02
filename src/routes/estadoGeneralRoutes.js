const express = require('express');
const router = express.Router();
const estadoGeneralController = require('../controllers/estadoGeneralController');

router.get('/', estadoGeneralController.getAllEstadoGeneral);

module.exports = router;
