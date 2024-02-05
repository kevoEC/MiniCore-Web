const Alumno = require('../models/Alumno');


// Crear un nuevo alumno
async function createAlumno(req, res) {
    const { nombre, usuarioId } = req.body;

    try {
        const usuarioExistente = await Alumno.findById(usuarioId);

        if (!usuarioExistente) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        const alumnoExistente = await Alumno.findOne({ usuario: usuarioId });

        if (alumnoExistente) {
            return res.status(400).send({ message: "Ya existe un alumno asociado a este usuario" });
        }

        const alumno = new Alumno({ nombre, usuario: usuarioId });
        await alumno.save();

        res.status(201).send(alumno);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al crear el alumno" });
    }
}

// Listar todos los alumnos
async function getAlumnos(req, res) {
    try {
        const alumnos = await Alumno.find();
        res.status(200).send(alumnos);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al obtener los alumnos" });
    }
}

// Actualizar un alumno
async function updateAlumno(req, res) {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const updatedAlumno = await Alumno.findByIdAndUpdate(id, { nombre }, { new: true });
        if (!updatedAlumno) return res.status(404).send({ message: "Alumno no encontrado" });
        res.status(200).send(updatedAlumno);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al actualizar el alumno" });
    }
}

// Eliminar un alumno
async function deleteAlumno(req, res) {
    const { id } = req.params;

    try {
        const deletedAlumno = await Alumno.findByIdAndDelete(id);
        if (!deletedAlumno) return res.status(404).send({ message: "Alumno no encontrado" });
        res.status(200).send({ message: "Alumno eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al eliminar el alumno" });
    }
}

module.exports = {
    createAlumno,
    getAlumnos,
    updateAlumno,
    deleteAlumno
};
