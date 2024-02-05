// /backend/models/Progreso.js
const mongoose = require('mongoose');

const ProgresoSchema = mongoose.Schema({
    tipo: {
        type: String,
        required: true
    },
    notas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nota'
    }],
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    // Agregar un campo para el ID del usuario
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'alumno' // Asegúrate de que 'Usuario' sea el nombre correcto del modelo de usuario en tu aplicación
    }
});

module.exports = mongoose.model('Progreso', ProgresoSchema);
