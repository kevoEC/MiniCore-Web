// /backend/models/Alumno.js
const mongoose = require('mongoose');

const AlumnoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    progresos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Progreso'
    }]
});

module.exports = mongoose.model('Alumno', AlumnoSchema);
