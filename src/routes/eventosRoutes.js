// routes/eventosRoutes.js
const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/eventosAgrupadosPorDia', eventosController.getEventosAgrupadosPorDia);

module.exports = router;
