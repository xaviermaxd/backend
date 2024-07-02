const Mucosas = require('../models/mucosasModel');

exports.getAllMucosas = async (req, res) => {
    try {
        const mucosas = await Mucosas.findAll();
        res.status(200).json(mucosas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las mucosas', error: error.message });
    }
};
