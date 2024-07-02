const express = require('express');
const router = express.Router();
const propietarioController = require('../controllers/propietarioController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);  // Asegura que todas las rutas estén protegidas

router.post('/', propietarioController.upload.single('Foto'), propietarioController.createPropietario);
router.get('/contar', propietarioController.contarPropietarios);
router.get('/', propietarioController.listarPropietarios);
router.get('/:id', propietarioController.getPropietario);
router.put('/:id', propietarioController.upload.single('Foto'), propietarioController.actualizarPropietario);
router.put('/:id/disable', propietarioController.eliminarPropietario);


module.exports = router;
