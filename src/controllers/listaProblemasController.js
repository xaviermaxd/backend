const { sequelize, Sequelize } = require('../config/db');
const ListaProblemas = require('../models/listaProblemasModel');
const ConsultaMedica = require('../models/consultaMedicaModel');
const Sistemas = require('../models/sistemasModel');

exports.getAllListaProblemas = async (req, res) => {
    try {
        const listaProblemas = await ListaProblemas.findAll({
            include: [
                { model: ConsultaMedica },
                { model: Sistemas }
            ]
        });
        res.status(200).json(listaProblemas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener lista de problemas', error: error.message });
    }
};

exports.getByIdConsultaMedica = async (req, res) => {
    try {
        const { consulta_medica_id } = req.params;
        const listaProblemas = await ListaProblemas.findAll({
            where: { consulta_medica_id, habilitado: 1 },
            include: [
                { model: ConsultaMedica },
                { model: Sistemas }
            ]
        });
        res.status(200).json(listaProblemas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener lista de problemas por id de consulta médica', error: error.message });
    }
};

exports.createListaProblemas = async (req, res) => {
    try {
        const newListaProblemas = await ListaProblemas.create(req.body);
        res.status(201).json(newListaProblemas);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear lista de problemas', error: error.message });
    }
};

exports.updateListaProblemas = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedListaProblemas = await ListaProblemas.update(req.body, { where: { id } });
        res.status(200).json(updatedListaProblemas);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar lista de problemas', error: error.message });
    }
};

exports.deleteListaProblemas = async (req, res) => {
    try {
        const { id } = req.params;
        await ListaProblemas.update({ habilitado: 0 }, { where: { id } });
        res.status(200).json({ message: 'Lista de problemas deshabilitada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al deshabilitar lista de problemas', error: error.message });
    }
};


  exports.getListaProblemasByFecha = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
  
    try {
      const listaProblemas = await sequelize.query(`
        SELECT s.nombre, COUNT(*) as count
        FROM listaproblemas lp
        JOIN consultamedica cm ON lp.consulta_medica_id = cm.id
        JOIN sistemas s ON lp.sistema_id = s.id
        WHERE cm.fecha_consulta BETWEEN :fechaInicio AND :fechaFin
        GROUP BY s.nombre
      `, {
        replacements: { fechaInicio, fechaFin },
        type: sequelize.QueryTypes.SELECT
      });
  
      res.status(200).json(listaProblemas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener lista de problemas', error: error.message });
    }
  };
  