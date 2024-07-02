const express = require('express');
const router = express.Router();
const tiempoLlenadoCapilarController = require('../controllers/tiempoLlenadoCapilarController');

router.get('/', tiempoLlenadoCapilarController.getAllTiempoLlenadoCapilar);

module.exports = router;
