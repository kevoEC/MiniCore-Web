const Progreso = require('../models/Progreso');
const Alumno = require('../models/Alumno'); // Importa el modelo de Alumno

// Crear un nuevo progreso
async function createProgreso(req, res) {
    const { tipo, fechaInicio, fechaFin, alumno } = req.body; // Asegúrate de recibir el ID del alumno

    try {
        // Verifica si existe el alumno
        const alumnoExistente = await Alumno.findById(alumno);

        if (!alumnoExistente) {
            return res.status(404).send({ message: "Alumno no encontrado" });
        }

        let progreso = new Progreso({ tipo, fechaInicio, fechaFin, alumno: alumno });
        await progreso.save();
        res.status(201).send(progreso);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al crear el progreso" });
    }
}

// Listar todos los progresos
async function getProgresos(req, res) {
    try {
        const progresos = await Progreso.find().populate('notas');
        res.status(200).send(progresos);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al obtener los progresos" });
    }
}

// Actualizar un progreso
async function updateProgreso(req, res) {
    const { id } = req.params;
    const { tipo, fechaInicio, fechaFin } = req.body;
    try {
        const updatedProgreso = await Progreso.findByIdAndUpdate(id, { tipo, fechaInicio, fechaFin }, { new: true });
        if (!updatedProgreso) return res.status(404).send({ message: "Progreso no encontrado" });
        res.status(200).send(updatedProgreso);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al actualizar el progreso" });
    }
}

// Eliminar un progreso
async function deleteProgreso(req, res) {
    const { id } = req.params;
    try {
        const deletedProgreso = await Progreso.findByIdAndDelete(id);
        if (!deletedProgreso) return res.status(404).send({ message: "Progreso no encontrado" });
        res.status(200).send({ message: "Progreso eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al eliminar el progreso" });
    }
}

module.exports = {
    createProgreso,
    getProgresos,
    updateProgreso,
    deleteProgreso
};
