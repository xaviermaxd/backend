const StatusMental = require('../models/statusMentalModel');

exports.getAllStatusMental = async (req, res) => {
    try {
        const estadosMentales = await StatusMental.findAll();
        res.status(200).json(estadosMentales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los estados mentales', error: error.message });
    }
};
