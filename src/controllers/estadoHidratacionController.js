const EstadoHidratacion = require('../models/estadoHidratacionModel');

exports.getAllEstadoHidratacion = async (req, res) => {
    try {
        const estadosHidratacion = await EstadoHidratacion.findAll();
        res.status(200).json(estadosHidratacion);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los estados de hidratación', error: error.message });
    }
};
