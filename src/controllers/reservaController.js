const Reserva = require('../models/reservaModel');
const Turno = require('../models/turnoModel');
const Propietario = require('../models/propietarioModel');
const Mascota = require('../models/mascotaModel');
const Horario = require('../models/horarioModel');
const { Op } = require('sequelize');

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
  try {
    const { TurnoID, PropietarioID, MascotaID, Notas, FechaReserva } = req.body;

    // Contar reservas existentes para el turno y la fecha
    const reservasCount = await Reserva.count({ where: { TurnoID, FechaReserva } });

    // Obtener la capacidad del turno
    const turno = await Turno.findOne({ where: { TurnoID } });

    if (reservasCount < turno.Capacidad) {
      const nuevaReserva = await Reserva.create({
        TurnoID,
        PropietarioID,
        MascotaID,
        Notas,
        FechaReserva,
        Estado: 'Reservado',
        FechaCreacion: new Date()
      });
      res.status(201).json(nuevaReserva);
    } else {
      res.status(400).json({ message: 'Capacidad del turno agotada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
  }
};

// Listar todas las reservas
exports.listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        { model: Turno, attributes: ['HorarioID', 'HoraInicio', 'HoraFin'] },
        { model: Propietario, attributes: ['Nombre', 'ApellidoPaterno', 'ApellidoMaterno'] },
        { model: Mascota, attributes: ['Nombre', 'Especie', 'Raza'] }
      ]
    });
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar las reservas', error: error.message });
  }
};

// Obtener una reserva por ID
exports.getReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findOne({
      where: { ReservaID: id },
      include: [
        { model: Turno, attributes: ['HorarioID', 'HoraInicio', 'HoraFin'] },
        { model: Propietario, attributes: ['Nombre', 'ApellidoPaterno', 'ApellidoMaterno'] },
        { model: Mascota, attributes: ['Nombre', 'Especie', 'Raza'] }
      ]
    });
    if (reserva) {
      res.status(200).json(reserva);
    } else {
      res.status(404).json({ message: 'Reserva no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la reserva', error: error.message });
  }
};

// Actualizar una reserva
exports.actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { TurnoID, PropietarioID, MascotaID, Notas, FechaReserva, Estado } = req.body;
    const [updated] = await Reserva.update(
      { TurnoID, PropietarioID, MascotaID, Notas, FechaReserva, Estado },
      { where: { ReservaID: id } }
    );
    if (updated) {
      const reservaActualizada = await Reserva.findOne({ where: { ReservaID: id } });
      res.status(200).json(reservaActualizada);
    } else {
      res.status(404).json({ message: 'Reserva no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reserva', error: error.message });
  }
};

// Eliminar una reserva
exports.eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reserva.destroy({ where: { ReservaID: id } });
    if (deleted) {
      res.status(200).json({ message: 'Reserva eliminada' });
    } else {
      res.status(404).json({ message: 'Reserva no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reserva', error: error.message });
  }
};



// Obtener estadísticas de reservas por día de la semana
exports.obtenerEstadisticasReservas = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ message: 'Fechas de inicio y fin son requeridas' });
    }

    const reservas = await Reserva.findAll({
      where: {
        FechaReserva: {
          [Op.between]: [fechaInicio, fechaFin]
        }
      },
      include: [
        {
          model: Turno,
          include: [
            {
              model: Horario,
              attributes: ['Dia']
            }
          ]
        }
      ]
    });

    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const estadisticas = diasSemana.reduce((acc, dia) => {
      acc[dia] = 0;
      return acc;
    }, {});

    reservas.forEach(reserva => {
      const dia = reserva.Turno.Horario.Dia;
      estadisticas[dia]++;
    });

    res.status(200).json(estadisticas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las estadísticas de reservas', error: error.message });
  }
};