const Propietario = require('../models/propietarioModel');
const { Op } = require('sequelize'); // Importar el operador Op de Sequelize
const multer = require('multer');
const path = require('path');

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../akfotos')); // Actualiza esta línea para la nueva ubicación
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo con la fecha actual
    }
});

// Crear el middleware de multer
const upload = multer({ storage: storage });

exports.upload = upload;


exports.createPropietario = async (req, res) => {
    try {
        const { Nombre, SegundoNombre, ApellidoPaterno, ApellidoMaterno, Direccion, Telefono, CorreoElectronico, DNI } = req.body;
        const Foto = req.file ? req.file.filename : null; // Si se subió una foto, guardar el nombre del archivo
        const nuevoPropietario = await Propietario.create({
            Nombre, SegundoNombre, ApellidoPaterno, ApellidoMaterno, Direccion, Telefono, CorreoElectronico, DNI, Foto
        });
        res.status(201).json(nuevoPropietario);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el propietario", error: error.message });
    }
};

exports.listarPropietarios = async (req, res) => {
    try {
        const nombre = req.query.nombre || '';
        const segundoNombre = req.query.segundoNombre;
        const apellidoPaterno = req.query.apellidoPaterno || '';
        const apellidoMaterno = req.query.apellidoMaterno || '';
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const offset = (page - 1) * pageSize;

        // Creamos un arreglo de condiciones para la cláusula WHERE
        const whereConditions = [
            { Habilitado: 1 },
            nombre ? { Nombre: { [Op.like]: `%${nombre}%` } } : null,
            segundoNombre ? { SegundoNombre: { [Op.like]: `%${segundoNombre}%` } } : null,
            apellidoPaterno ? { ApellidoPaterno: { [Op.like]: `%${apellidoPaterno}%` } } : null,
            apellidoMaterno ? { ApellidoMaterno: { [Op.like]: `%${apellidoMaterno}%` } } : null
        ].filter(condition => condition !== null);  // Filtra para eliminar condiciones nulas

        const propietarios = await Propietario.findAll({
            where: {
                [Op.and]: whereConditions
            },
            offset: offset,
            limit: pageSize
        });

        const totalItems = await Propietario.count({
            where: {
                [Op.and]: whereConditions
            }
        });

        res.status(200).json({
            data: propietarios,
            pagination: {
                totalItems: totalItems,
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(totalItems / pageSize)
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al listar propietarios", error: error.message });
    }
};


exports.actualizarPropietario = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, SegundoNombre, ApellidoPaterno, ApellidoMaterno, Direccion, Telefono, CorreoElectronico, DNI } = req.body;
        
        // Obtener el propietario existente
        const propietarioExistente = await Propietario.findOne({ where: { PropietarioID: id } });
        
        // Mantener la foto antigua si no se proporciona una nueva
        const Foto = req.file ? req.file.filename : propietarioExistente.Foto;
        
        // Actualizar el propietario
        await Propietario.update({
            Nombre, SegundoNombre, ApellidoPaterno, ApellidoMaterno, Direccion, Telefono, CorreoElectronico, DNI, Foto
        }, {
            where: { PropietarioID: id }
        });
        
        res.status(200).json({ message: "Propietario actualizado" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar propietario", error: error.message });
    }
};

exports.eliminarPropietario = async (req, res) => {
    try {
        const { id } = req.params;
        await Propietario.update({ Habilitado: 0 }, { where: { PropietarioID: id } });
        res.status(200).json({ message: "Propietario deshabilitado" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar propietario", error: error.message });
    }
};


exports.getPropietario = async (req, res) => {
    try {
      const { id } = req.params;
      const propietario = await Propietario.findOne({ where: { PropietarioID: id } });
      if (propietario) {
        res.status(200).json(propietario);
      } else {
        res.status(404).json({ message: "Propietario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener propietario", error: error.message });
    }
    
};


exports.contarPropietarios = async (req, res) => {
    try {
        const totalPropietarios = await Propietario.count();
        const habilitados = await Propietario.count({ where: { Habilitado: 1 } });
        const deshabilitados = await Propietario.count({ where: { Habilitado: 0 } });

        res.status(200).json({
            totalPropietarios,
            habilitados,
            deshabilitados
        });
    } catch (error) {
        res.status(500).json({ message: "Error al contar propietarios", error: error.message });
    }
};

