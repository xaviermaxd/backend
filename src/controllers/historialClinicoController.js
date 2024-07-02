const HistorialClinico = require('../models/historialClinicoModel');
const Mascota = require('../models/mascotaModel'); // Importar el modelo Mascota
const Propietario = require('../models/propietarioModel'); // Importar el modelo Propietario
const Veterinario = require('../models/veterinarioModel'); // Importar el modelo Veterinario
const { Op } = require('sequelize');

// Crear un nuevo historial clínico
exports.createHistorialClinico = async (req, res) => {
    try {
        const historial = await HistorialClinico.create(req.body);
        res.status(201).json(historial);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el historial clínico", error: error.message });
    }
};

// Actualizar un historial clínico
exports.actualizarHistorialClinico = async (req, res) => {
    try {
        const { id } = req.params;
        const updateResult = await HistorialClinico.update(req.body, {
            where: { HistorialID: id, Habilitado: 1 }
        });

        if (updateResult[0] === 1) {
            res.status(200).json({ message: "Historial clínico actualizado" });
        } else {
            res.status(404).json({ message: "Historial clínico no encontrado o ya deshabilitado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el historial clínico", error: error.message });
    }
};

// Eliminar un historial clínico (eliminación lógica)
exports.eliminarHistorialClinico = async (req, res) => {
    try {
        const { id } = req.params;
        const updateResult = await HistorialClinico.update({ Habilitado: 0 }, {
            where: { HistorialID: id }
        });

        if (updateResult[0] === 1) {
            res.status(200).json({ message: "Historial clínico deshabilitado" });
        } else {
            res.status(404).json({ message: "Historial clínico no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar el historial clínico", error: error.message });
    }
};

exports.listarHistorialesClinicos = async (req, res) => {
    const { mascotaId } = req.params; // ID de la mascota
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const offset = (page - 1) * pageSize;
    const fechaDesde = req.query.fechaDesde;
    const fechaHasta = req.query.fechaHasta;

    const whereClause = {
        MascotaID: mascotaId,
        Habilitado: 1
    };

    // Ajustar la cláusula WHERE según los parámetros de fecha proporcionados
    if (fechaDesde && fechaHasta) {
        whereClause.Fecha = {
            [Op.between]: [new Date(fechaDesde), new Date(fechaHasta)] // Busca registros dentro del rango de fechas
        };
    } else if (fechaDesde) {
        whereClause.Fecha = {
            [Op.gte]: new Date(fechaDesde) // Busca registros desde la fecha proporcionada en adelante
        };
    } else if (fechaHasta) {
        whereClause.Fecha = {
            [Op.lte]: new Date(fechaHasta) // Busca registros hasta la fecha proporcionada
        };
    }

    try {
        const historiales = await HistorialClinico.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Mascota,
                    as: 'Mascota',
                    include: [
                        { model: Propietario, as: 'Propietario' }
                    ]
                },
                {
                    model: Veterinario,
                    as: 'Veterinario',
                    attributes: { exclude: ['Contrasena'] }
                }
            ],
            limit: pageSize,
            offset: offset,
            order: [['Fecha', 'DESC']] // Ordena por fecha de forma descendente
        });

        res.status(200).json({
            data: historiales.rows,
            pagination: {
                totalItems: historiales.count,
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(historiales.count / pageSize)
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al listar los historiales clínicos", error: error.message });
    }
};


// controllers/historialClinicoController.js

exports.obtenerHistorialClinico = async (req, res) => {
    const { id } = req.params; // ID del historial clínico

    try {
        const historial = await HistorialClinico.findByPk(id, {
            include: [
                {
                    model: Mascota,
                    as: 'Mascota',
                    include: [{ model: Propietario, as: 'Propietario' }]
                },
                {
                    model: Veterinario,
                    as: 'Veterinario',
                    attributes: { exclude: ['Contrasena'] }
                }
            ]
        });

        if (!historial) {
            return res.status(404).json({ message: "Historial clínico no encontrado." });
        }

        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el historial clínico", error: error.message });
    }
};
