const PatronFR = require('../models/patronFRModel');

exports.getAllPatronFR = async (req, res) => {
    try {
        const patronesFR = await PatronFR.findAll();
        res.status(200).json(patronesFR);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los patrones FR', error: error.message });
    }
};
