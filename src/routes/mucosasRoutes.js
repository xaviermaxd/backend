const express = require('express');
const router = express.Router();
const mucosasController = require('../controllers/mucosasController');

router.get('/', mucosasController.getAllMucosas);

module.exports = router;
