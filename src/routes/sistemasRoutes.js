const express = require('express');
const router = express.Router();
const sistemasController = require('../controllers/sistemasController');

router.get('/', sistemasController.getAllSistemas);
router.get('/:id', sistemasController.getSistemasById);

module.exports = router;
