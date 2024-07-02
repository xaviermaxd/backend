const express = require('express');
const router = express.Router();
const patronFRController = require('../controllers/patronFRController');

router.get('/', patronFRController.getAllPatronFR);

module.exports = router;
