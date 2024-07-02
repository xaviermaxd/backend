const TiempoLlenadoCapilar = require('../models/tiempoLlenadoCapilarModel');

exports.getAllTiempoLlenadoCapilar = async (req, res) => {
    try {
        const tiemposLlenadoCapilar = await TiempoLlenadoCapilar.findAll();
        res.status(200).json(tiemposLlenadoCapilar);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tiempos de llenado capilar', error: error.message });
    }
};
