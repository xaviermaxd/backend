const express = require('express');
const router = express.Router();
const condicionCorporalController = require('../controllers/condicionCorporalController');

router.get('/', condicionCorporalController.getAllCondicionCorporal);

module.exports = router;
