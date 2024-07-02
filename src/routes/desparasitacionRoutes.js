const express = require('express');
const router = express.Router();
const desparasitacionController = require('../controllers/desparasitacionController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', desparasitacionController.getAllDesparasitacion);
router.post('/', desparasitacionController.createDesparasitacion);
router.get('/:id', desparasitacionController.getDesparasitacion);
router.get('/mascota/:mascota_id', desparasitacionController.getDesparasitacionByMascotaId);
router.put('/:id', desparasitacionController.updateDesparasitacion);
router.put('/:id/disable', desparasitacionController.deleteDesparasitacion);

module.exports = router;
