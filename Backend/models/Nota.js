// /backend/models/Nota.js
const mongoose = require('mongoose');

const NotaSchema = mongoose.Schema({
    valor: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    fecha: {
        type: Date,
        required: true
    },
    progreso: { // Agregar un campo para el ID del progreso
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Progreso' // Asegúrate de que 'Progreso' sea el nombre correcto del modelo de progreso en tu aplicación
    }
});

module.exports = mongoose.model('Nota', NotaSchema);
