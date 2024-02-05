const express = require('express');
const router = express.Router();
const ProgresoController = require('../controllers/Progreso');

// Define las rutas para Progreso
router.post('/progreso', ProgresoController.createProgreso);
router.get('/progreso', ProgresoController.getProgresos);
router.put('/progreso/:id', ProgresoController.updateProgreso);
router.delete('/progreso/:id', ProgresoController.deleteProgreso);

module.exports = router;
