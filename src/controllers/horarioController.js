// horarioController.js
const Horario = require('../models/horarioModel');

// Crear un nuevo horario
exports.createHorario = async (req, res) => {
  try {
    const { Dia } = req.body;
    const nuevoHorario = await Horario.create({ Dia });
    res.status(201).json(nuevoHorario);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el horario', error: error.message });
  }
};

// Listar todos los horarios
exports.listarHorarios = async (req, res) => {
  try {
    const horarios = await Horario.findAll();
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los horarios', error: error.message });
  }
};

// Obtener un horario por ID
exports.getHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const horario = await Horario.findOne({ where: { HorarioID: id } });
    if (horario) {
      res.status(200).json(horario);
    } else {
      res.status(404).json({ message: 'Horario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el horario', error: error.message });
  }
};

// Actualizar un horario
exports.actualizarHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const { Dia } = req.body;
    const [updated] = await Horario.update({ Dia }, { where: { HorarioID: id } });
    if (updated) {
      const horarioActualizado = await Horario.findOne({ where: { HorarioID: id } });
      res.status(200).json(horarioActualizado);
    } else {
      res.status(404).json({ message: 'Horario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el horario', error: error.message });
  }
};

// Eliminar un horario
exports.eliminarHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Horario.destroy({ where: { HorarioID: id } });
    if (deleted) {
      res.status(200).json({ message: 'Horario eliminado' });
    } else {
      res.status(404).json({ message: 'Horario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el horario', error: error.message });
  }
};
