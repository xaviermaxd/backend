const Sistemas = require('../models/sistemasModel');

exports.getAllSistemas = async (req, res) => {
    try {
        const sistemas = await Sistemas.findAll();
        res.status(200).json(sistemas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los sistemas', error: error.message });
    }
};

exports.getSistemasById = async (req, res) => {
    try {
        const { id } = req.params;
        const sistema = await Sistemas.findByPk(id);
        if (sistema) {
            res.status(200).json(sistema);
        } else {
            res.status(404).json({ message: 'Sistema no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el sistema', error: error.message });
    }
};
