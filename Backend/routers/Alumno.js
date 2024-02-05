// /backend/routers/alumno.js
const express = require('express');
const alumnoController = require('../controllers/Alumno');
const router = express.Router();

router.post('/alumno', alumnoController.createAlumno);
router.get('/alumnos', alumnoController.getAlumnos);
router.put('/alumno/:id', alumnoController.updateAlumno);
router.delete('/alumno/:id', alumnoController.deleteAlumno);

module.exports = router;
