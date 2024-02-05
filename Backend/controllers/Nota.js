const Nota = require('../models/Nota');
const Progreso = require('../models/Progreso');

// Crear una nueva nota y asociarla a un progreso existente
async function createNota(req, res) {
    const { valor, fecha, progresoId } = req.body;
    try {
        // Verificar si existe el progreso
        const progresoExistente = await Progreso.findById(progresoId);

        if (!progresoExistente) {
            return res.status(404).send({ message: "Progreso no encontrado" });
        }

        // Crear la nueva nota
        let nota = new Nota({ valor, fecha, progreso: progresoId });
        const savedNota = await nota.save();

        // Asociar la nota al progreso especificado
        await Progreso.findByIdAndUpdate(progresoId, { $push: { notas: savedNota._id } }, { new: true });

        res.status(201).send(nota);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al crear la nota" });
    }
}

// Obtener todas las notas
async function getNotas(req, res) {
    try {
        const notas = await Nota.find();
        res.status(200).send(notas);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al obtener las notas" });
    }
}

// Actualizar una nota por su ID
async function updateNota(req, res) {
    const { id } = req.params;
    const { valor, fecha } = req.body;
    try {
        const updatedNota = await Nota.findByIdAndUpdate(id, { valor, fecha }, { new: true });
        if (!updatedNota) return res.status(404).send({ message: "Nota no encontrada" });
        res.status(200).send(updatedNota);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al actualizar la nota" });
    }
}

// Eliminar una nota por su ID
async function deleteNota(req, res) {
    const { id } = req.params;
    try {
        const deletedNota = await Nota.findByIdAndDelete(id);
        if (!deletedNota) return res.status(404).send({ message: "Nota no encontrada" });

        // Eliminar la referencia de la nota en el progreso
        await Progreso.findByIdAndUpdate(deletedNota.progreso, { $pull: { notas: id } }, { new: true });

        res.status(200).send({ message: "Nota eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al eliminar la nota" });
    }
}

module.exports = {
    createNota,
    getNotas,
    updateNota,
    deleteNota
};
