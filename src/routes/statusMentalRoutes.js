const express = require('express');
const router = express.Router();
const statusMentalController = require('../controllers/statusMentalController');

router.get('/', statusMentalController.getAllStatusMental);

module.exports = router;
