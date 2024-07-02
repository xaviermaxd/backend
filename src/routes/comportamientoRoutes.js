const express = require('express');
const router = express.Router();
const comportamientoController = require('../controllers/comportamientoController');

router.get('/', comportamientoController.getAllComportamiento);

module.exports = router;
