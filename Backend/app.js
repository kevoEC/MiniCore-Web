const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { API_VERSION } = require('./constants');

const app = express();

// Importando rutas (Asumiendo que estas rutas se crearán)
const alumnoRoutes = require('./routers/Alumno');
const notaRoutes = require('./routers/Nota');
const progresoRoutes = require('./routers/Progreso');

// Configuración del Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de CORS
app.use(cors());

// Configuración de rutas
app.use(`/api/${API_VERSION}`, alumnoRoutes);
app.use(`/api/${API_VERSION}`, notaRoutes);
app.use(`/api/${API_VERSION}`, progresoRoutes);

module.exports = app;
