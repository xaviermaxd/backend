const Turno = require('../models/turnoModel');
const Horario = require('../models/horarioModel');

// Crear un nuevo turno
exports.createTurno = async (req, res) => {
  try {
    const { HorarioID, HoraInicio, HoraFin, Capacidad } = req.body;
    const nuevoTurno = await Turno.create({ HorarioID, HoraInicio, HoraFin, Capacidad });
    res.status(201).json(nuevoTurno);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el turno', error: error.message });
  }
};

// Listar todos los turnos
exports.listarTurnos = async (req, res) => {
  try {
    const turnos = await Turno.findAll({
      include: {
        model: Horario,
        attributes: ['Dia']
      }
    });
    res.status(200).json(turnos);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los turnos', error: error.message });
  }
};

// Obtener un turno por ID
exports.getTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findOne({ 
      where: { TurnoID: id },
      include: {
        model: Horario,
        attributes: ['Dia']
      }
    });
    if (turno) {
      res.status(200).json(turno);
    } else {
      res.status(404).json({ message: 'Turno no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el turno', error: error.message });
  }
};

// Actualizar un turno
exports.actualizarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const { HorarioID, HoraInicio, HoraFin, Capacidad } = req.body;
    const [updated] = await Turno.update({ HorarioID, HoraInicio, HoraFin, Capacidad }, { where: { TurnoID: id } });
    if (updated) {
      const turnoActualizado = await Turno.findOne({ where: { TurnoID: id } });
      res.status(200).json(turnoActualizado);
    } else {
      res.status(404).json({ message: 'Turno no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el turno', error: error.message });
  }
};

// Eliminar un turno
exports.eliminarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Turno.destroy({ where: { TurnoID: id } });
    if (deleted) {
      res.status(200).json({ message: 'Turno eliminado' });
    } else {
      res.status(404).json({ message: 'Turno no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el turno', error: error.message });
  }
};
