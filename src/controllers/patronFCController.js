const PatronFC = require('../models/patronFCModel');

exports.getAllPatronFC = async (req, res) => {
    try {
        const patronesFC = await PatronFC.findAll();
        res.status(200).json(patronesFC);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los patrones FC', error: error.message });
    }
};
