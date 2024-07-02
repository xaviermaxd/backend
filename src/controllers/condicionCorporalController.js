const CondicionCorporal = require('../models/condicionCorporalModel');

exports.getAllCondicionCorporal = async (req, res) => {
    try {
        const condicionesCorporales = await CondicionCorporal.findAll();
        res.status(200).json(condicionesCorporales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las condiciones corporales', error: error.message });
    }
};
