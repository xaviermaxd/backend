const express = require('express');
const router = express.Router();
const examenesMedicosController = require('../controllers/examenesMedicosController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', examenesMedicosController.getAllExamenesMedicos);
router.get('/:id', examenesMedicosController.getExamenMedicoById);

module.exports = router;
