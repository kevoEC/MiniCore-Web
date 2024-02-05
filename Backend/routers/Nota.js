const express = require('express');
const notaController = require('../controllers/Nota');
const router = express.Router();

// Ruta para crear una nueva nota
router.post('/nota', notaController.createNota);

// Ruta para obtener todas las notas
router.get('/nota', notaController.getNotas);

// Ruta para actualizar una nota por ID
router.put('/nota/:id', notaController.updateNota);

// Ruta para eliminar una nota por ID
router.delete('/nota/:id', notaController.deleteNota);

module.exports = router;
