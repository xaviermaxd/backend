const express = require('express');
const router = express.Router();
const patronFCController = require('../controllers/patronFCController');

router.get('/', patronFCController.getAllPatronFC);

module.exports = router;
