const EstadoGeneral = require('../models/estadoGeneralModel');

exports.getAllEstadoGeneral = async (req, res) => {
    try {
        const estadosGenerales = await EstadoGeneral.findAll();
        res.status(200).json(estadosGenerales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los estados generales', error: error.message });
    }
};
