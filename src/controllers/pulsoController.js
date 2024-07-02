const Pulso = require('../models/pulsoModel');

exports.getAllPulso = async (req, res) => {
    try {
        const pulsos = await Pulso.findAll();
        res.status(200).json(pulsos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pulsos', error: error.message });
    }
};
