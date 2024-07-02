const express = require('express');
const router = express.Router();
const temperamentoController = require('../controllers/temperamentoController');

router.get('/', temperamentoController.getAllTemperamento);

module.exports = router;
