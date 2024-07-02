const Temperamento = require('../models/temperamentoModel');

exports.getAllTemperamento = async (req, res) => {
    try {
        const temperamentos = await Temperamento.findAll();
        res.status(200).json(temperamentos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los temperamentos', error: error.message });
    }
};
