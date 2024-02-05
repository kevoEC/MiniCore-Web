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

        // GUARDAR REFERENCIA EN ALUMNO
        alumnoExistente.progresos.push(progreso._id);
        await alumnoExistente.save();

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
    const { progresoId } = req.params;
    const { tipo, fechaInicio, fechaFin, alumno } = req.body;

    try {
        // Verificar si existe el progreso
        const progresoExistente = await Progreso.findById(progresoId);

        if (!progresoExistente) {
            return res.status(404).send({ message: "Progreso no encontrado" });
        }

        // Actualizar el progreso
        progresoExistente.tipo = tipo;
        progresoExistente.fechaInicio = fechaInicio;
        progresoExistente.fechaFin = fechaFin;
        progresoExistente.alumno = alumno;

        await progresoExistente.save();

        res.status(200).send(progresoExistente);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al actualizar el progreso" });
    }
}

// Eliminar un progreso
async function deleteProgreso(req, res) {
    const { id } = req.params;
    try {
        // Buscar el progreso a eliminar
        const deletedProgreso = await Progreso.findByIdAndDelete(id);
        if (!deletedProgreso) {
            return res.status(404).send({ message: "Progreso no encontrado" });
        }

        // Eliminar la referencia del progreso en el array de progresos del alumno
        await Alumno.updateOne(
            { progresos: id }, // Buscar el progreso por su ID en el array de progresos del alumno
            { $pull: { progresos: id } } // Eliminar el progreso del array de progresos
        );

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
