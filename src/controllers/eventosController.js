const { sequelize } = require('../config/db');
const { QueryTypes } = require('sequelize');
const ConsultaMedica = require('../models/consultaMedicaModel');
const Vacunacion = require('../models/vacunacionModel');
const Desparasitacion = require('../models/desparasitacionModel');

exports.getEventosAgrupadosPorDia = async (req, res) => {
    const { fechaInicio, fechaFin, tipoEvento } = req.query;

    let consultaMedicaQuery = `
        SELECT DAYOFWEEK(fecha_consulta) as dia_semana, COUNT(*) as count
        FROM consultamedica
        WHERE fecha_consulta BETWEEN :fechaInicio AND :fechaFin
        GROUP BY dia_semana
    `;

    let vacunacionQuery = `
        SELECT DAYOFWEEK(fecha_aplicacion) as dia_semana, COUNT(*) as count
        FROM vacunacion
        WHERE fecha_aplicacion BETWEEN :fechaInicio AND :fechaFin
        GROUP BY dia_semana
    `;

    let desparasitacionQuery = `
        SELECT DAYOFWEEK(fecha_aplicacion) as dia_semana, COUNT(*) as count
        FROM desparasitacion
        WHERE fecha_aplicacion BETWEEN :fechaInicio AND :fechaFin
        GROUP BY dia_semana
    `;

    try {
        let resultados = [];

        if (tipoEvento === 'consultaMedica') {
            resultados = await sequelize.query(consultaMedicaQuery, {
                replacements: { fechaInicio, fechaFin },
                type: QueryTypes.SELECT
            });
        } else if (tipoEvento === 'vacunacion') {
            resultados = await sequelize.query(vacunacionQuery, {
                replacements: { fechaInicio, fechaFin },
                type: QueryTypes.SELECT
            });
        } else if (tipoEvento === 'desparasitacion') {
            resultados = await sequelize.query(desparasitacionQuery, {
                replacements: { fechaInicio, fechaFin },
                type: QueryTypes.SELECT
            });
        } else if (tipoEvento === 'todos') {
            const consultas = await sequelize.query(consultaMedicaQuery, {
                replacements: { fechaInicio, fechaFin },
                type: QueryTypes.SELECT
            });

            const vacunaciones = await sequelize.query(vacunacionQuery, {
                replacements: { fechaInicio, fechaFin },
                type: QueryTypes.SELECT
            });

            const desparasitaciones = await sequelize.query(desparasitacionQuery, {
                replacements: { fechaInicio, fechaFin },
                type: QueryTypes.SELECT
            });

            // Combinar los resultados
            const diaSemanaCounts = {};

            const sumarResultados = (eventos) => {
                eventos.forEach(evento => {
                    if (!diaSemanaCounts[evento.dia_semana]) {
                        diaSemanaCounts[evento.dia_semana] = 0;
                    }
                    diaSemanaCounts[evento.dia_semana] += evento.count;
                });
            };

            sumarResultados(consultas);
            sumarResultados(vacunaciones);
            sumarResultados(desparasitaciones);

            resultados = Object.keys(diaSemanaCounts).map(dia_semana => ({
                dia_semana: parseInt(dia_semana),
                count: diaSemanaCounts[dia_semana]
            }));
        } else {
            return res.status(400).json({ message: 'Tipo de evento no válido' });
        }

        res.status(200).json(resultados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener eventos', error: error.message });
    }
};
