// // routes/veterinarioRoutes.js
// const express = require('express');
// const router = express.Router();
// const veterinarioController = require('../controllers/veterinarioController');
// const authMiddleware = require('../middleware/authMiddleware');

// // Rutas que no requieren autenticación
// router.post('/login', veterinarioController.login);
// router.post('/', veterinarioController.createVeterinario); // Si esta es para crear y no debe estar protegida

// // Aplica el middleware de autenticación a todas las demás rutas que sí lo requieren
// router.use(authMiddleware);

// // Rutas que requieren autenticación
// router.get('/',veterinarioController.getAllVeterinarios);
// router.get('/:id', veterinarioController.getVeterinario);
// router.put('/:id', veterinarioController.updateVeterinario);
// router.delete('/:id', veterinarioController.deleteVeterinario);
// router.put('/:id/updatepassword', veterinarioController.updateVeterinarioPassword);
// router.get('/logout', veterinarioController.logout);


// module.exports = router;

const express = require('express');
const router = express.Router();
const veterinarioController = require('../controllers/veterinarioController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

// Middleware para manejar la subida de archivos múltiples
const uploadFields = [
    { name: 'FotoVeterinario', maxCount: 1 },
    { name: 'FotoDNI', maxCount: 1 },
    { name: 'CurriculumVitae', maxCount: 1 }
];

// Rutas que no requieren autenticación
router.post('/login', veterinarioController.login);
router.post('/', veterinarioController.upload.fields(uploadFields), veterinarioController.createVeterinario);

// Aplica el middleware de autenticación a todas las demás rutas que sí lo requieren
router.use(authMiddleware);

// Rutas que requieren autenticación
router.get('/', veterinarioController.getAllVeterinarios);
router.get('/:id', veterinarioController.getVeterinario);
router.put('/:id', veterinarioController.upload.fields(uploadFields), veterinarioController.updateVeterinario);
router.delete('/:id', veterinarioController.deleteVeterinario);
router.put('/:id/updatepassword', veterinarioController.updateVeterinarioPassword);
router.get('/logout', veterinarioController.logout);

module.exports = router;
