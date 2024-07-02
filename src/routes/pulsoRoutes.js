const express = require('express');
const router = express.Router();
const pulsoController = require('../controllers/pulsoController');

router.get('/', pulsoController.getAllPulso);

module.exports = router;
