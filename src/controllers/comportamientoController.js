const Comportamiento = require('../models/comportamientoModel');

exports.getAllComportamiento = async (req, res) => {
    try {
        const comportamientos = await Comportamiento.findAll();
        res.status(200).json(comportamientos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comportamientos', error: error.message });
    }
};
