// intentoReservaController.js
const IntentoReserva = require('../models/intentoModel');

// Crear un nuevo intento de reserva
exports.createIntentoReserva = async (req, res) => {
  try {
    const { FechaSolicitada, FechaIntento } = req.body;
    const nuevoIntentoReserva = await IntentoReserva.create({ FechaSolicitada, FechaIntento });
    res.status(201).json(nuevoIntentoReserva);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el intento de reserva', error: error.message });
  }
};

// Listar todos los intentos de reserva
exports.listarIntentosReserva = async (req, res) => {
  try {
    const intentosReserva = await IntentoReserva.findAll();
    res.status(200).json(intentosReserva);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los intentos de reserva', error: error.message });
  }
};

// Obtener un intento de reserva por ID
exports.getIntentoReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const intentoReserva = await IntentoReserva.findOne({ where: { IntentoID: id } });
    if (intentoReserva) {
      res.status(200).json(intentoReserva);
    } else {
      res.status(404).json({ message: 'Intento de reserva no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el intento de reserva', error: error.message });
  }
};

// Actualizar un intento de reserva
exports.actualizarIntentoReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { FechaSolicitada, FechaIntento } = req.body;
    const [updated] = await IntentoReserva.update({ FechaSolicitada, FechaIntento }, { where: { IntentoID: id } });
    if (updated) {
      const intentoReservaActualizado = await IntentoReserva.findOne({ where: { IntentoID: id } });
      res.status(200).json(intentoReservaActualizado);
    } else {
      res.status(404).json({ message: 'Intento de reserva no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el intento de reserva', error: error.message });
  }
};

// Eliminar un intento de reserva
exports.eliminarIntentoReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await IntentoReserva.destroy({ where: { IntentoID: id } });
    if (deleted) {
      res.status(200).json({ message: 'Intento de reserva eliminado' });
    } else {
      res.status(404).json({ message: 'Intento de reserva no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el intento de reserva', error: error.message });
  }
};
