// mascotaController.js
const Propietario = require('../models/propietarioModel');
const Mascota = require('../models/mascotaModel');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../akfotos')); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo con la fecha actual
  }
});

// Crear el middleware de multer
const upload = multer({ storage: storage });

exports.upload = upload;



exports.createMascota = async (req, res) => {
  try {
      const { PropietarioID, Nombre, Especie, Raza, Sexo, FechaNacimiento, Color, Alergias } = req.body;
      const Foto = req.file ? req.file.filename : 'default.png'; // Asigna 'default.png' si no hay foto
      const nuevaMascota = await Mascota.create({ PropietarioID, Nombre, Especie, Raza, Sexo, FechaNacimiento, Color, Alergias, Foto });
      res.status(201).json(nuevaMascota);
  } catch (error) {
      res.status(500).json({ message: "Error al crear la mascota", error: error.message });
  }
};

exports.listarMascotas = async (req, res) => {
    try {
      const nombre = req.query.nombre || '';
      const propietario = req.query.propietario || '';
      const especie = req.query.especie || '';
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 5;
      const offset = (page - 1) * pageSize;
  
      const mascotas = await Mascota.findAll({
        where: {
          Nombre: {
            [Op.like]: `%${nombre}%`
          },
          Especie: especie !== 'todos' ? especie : { [Op.ne]: null },
          Habilitado: 1,
          '$Propietario.Nombre$': {
            [Op.like]: `%${propietario}%`
          }
        },
        include: Propietario ,
        offset: offset,
        limit: pageSize
      });
  
      const totalItems = await Mascota.count({
        where: {
          Nombre: {
            [Op.like]: `%${nombre}%`
          },
          Especie: especie !== 'todos' ? especie : { [Op.ne]: null },
          Habilitado: 1,
          '$Propietario.Nombre$': {
            [Op.like]: `%${propietario}%`
          }
        },
        include: {
          model: Propietario,
          attributes: ['Nombre', 'Telefono'],
        },
      });
  
      res.status(200).json({
        data: mascotas,
        pagination: {
          totalItems: totalItems,
          currentPage: page,
          pageSize: pageSize,
          totalPages: Math.ceil(totalItems / pageSize)
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Error al listar mascotas", error: error.message });
    }
  };
  
// mascotaController.js
exports.getMascota = async (req, res) => {
    try {
      const { id } = req.params;
      const mascota = await Mascota.findOne({ 
        where: { MascotaID: id },
        include: Propietario  // Incluye los datos del propietario
      });
      if (mascota) {
        res.status(200).json(mascota);
      } else {
        res.status(404).json({ message: "Mascota no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener mascota", error: error.message });
    }
};


exports.listarMascotasPorPropietario = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const offset = (page - 1) * pageSize;

        const mascotas = await Mascota.findAll({
            where: {
                PropietarioID: id,
                Habilitado: 1
            },
            
            offset: offset,
            limit: pageSize
        });

        const totalItems = await Mascota.count({
            where: {
                PropietarioID: id,
                Habilitado: 1
            }
        });

        res.status(200).json({
            data: mascotas,
            pagination: {
                totalItems: totalItems,
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(totalItems / pageSize)
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al listar mascotas por propietario", error: error.message });
    }
};

exports.actualizarMascota = async (req, res) => {
  try {
      const { id } = req.params;
      const { Nombre, Especie, Raza, Sexo, FechaNacimiento, Color, Alergias } = req.body;
      
      // Obtener la mascota existente
      const mascotaExistente = await Mascota.findOne({ where: { MascotaID: id } });
      
      // Mantener la foto antigua si no se proporciona una nueva
      const Foto = req.file ? req.file.filename : mascotaExistente.Foto;
      
      // Actualizar la mascota
      await Mascota.update({ Nombre, Especie, Raza, Sexo, FechaNacimiento, Color, Alergias, Foto }, {
          where: { MascotaID: id }
      });
      
      res.status(200).json({ message: "Mascota actualizada" });
  } catch (error) {
      res.status(500).json({ message: "Error al actualizar mascota", error: error.message });
  }
};

exports.eliminarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        await Mascota.update({ Habilitado: 0 }, { where: { MascotaID: id } });
        res.status(200).json({ message: "Mascota deshabilitada" });
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar mascota", error: error.message });
    }
};
