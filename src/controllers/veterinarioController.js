const Veterinario = require('../models/veterinarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize, QueryTypes } = require('../config/db');
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


exports.getAllVeterinarios = async (req, res) => {
    try {
        // Recibir los parámetros de búsqueda y paginación desde la consulta
        const nombre = req.query.nombre || '';
        const apellidoPaterno = req.query.apellidoPaterno || '';
        const apellidoMaterno = req.query.apellidoMaterno || '';
        const especialidad = req.query.especialidad || '';
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const offset = (page - 1) * pageSize;

        // Filtrar por nombre, apellidos, especialidad y por el estado habilitado
        const veterinarios = await Veterinario.findAll({
            where: {
                [Op.and]: [
                    { Habilitado: true },
                    { Nombre: { [Op.like]: `%${nombre}%` } },
                    { ApellidoPaterno: { [Op.like]: `%${apellidoPaterno}%` } },
                    { ApellidoMaterno: { [Op.like]: `%${apellidoMaterno}%` } },
                    { Especialidad: { [Op.like]: `%${especialidad}%` } }
                ]
            },
            offset: offset,
            limit: pageSize
        });

        // Contar el total de elementos que coinciden con los criterios de búsqueda
        const totalItems = await Veterinario.count({
            where: {
                [Op.and]: [
                    { Habilitado: true },
                    { Nombre: { [Op.like]: `%${nombre}%` } },
                    { ApellidoPaterno: { [Op.like]: `%${apellidoPaterno}%` } },
                    { ApellidoMaterno: { [Op.like]: `%${apellidoMaterno}%` } },
                    { Especialidad: { [Op.like]: `%${especialidad}%` } }
                ]
            }
        });

        // Enviar los resultados con datos de paginación
        res.status(200).json({
            data: veterinarios,
            pagination: {
                totalItems: totalItems,
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(totalItems / pageSize)
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener veterinarios", error: error.message });
    }
};


exports.getVeterinario = async (req, res) => {
    try {
      const { id } = req.params;
      const veterinario = await Veterinario.findOne({ where: { VeterinarioID: id } });
      if (veterinario) {
        res.status(200).json(veterinario);
      } else {
        res.status(404).json({ message: "Veterinario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener veterinario", error: error.message });
    }
  };
  


exports.createVeterinario = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.Contrasena, 12);

        // Obtener el máximo valor de VeterinarioID y sumarle 1
        const maxIdResult = await sequelize.query("SELECT MAX(VeterinarioID) AS max_id FROM veterinarios;", { type: QueryTypes.SELECT });
        const nextId = (maxIdResult[0].max_id || 0) + 1;
        const codVet = 'VET' + String(nextId).padStart(3, '0');

        const fotoVeterinario = req.files.FotoVeterinario ? req.files.FotoVeterinario[0].filename : 'default.png';
        const fotoDNI = req.files.FotoDNI ? req.files.FotoDNI[0].filename : null;
        const curriculumVitae = req.files.CurriculumVitae ? req.files.CurriculumVitae[0].filename : null;

        const newVet = await Veterinario.create({
            Nombre: req.body.Nombre,
            Usuario: req.body.Usuario,
            Contrasena: hash,
            Especialidad: req.body.Especialidad,
            Telefono: req.body.Telefono,
            CorreoElectronico: req.body.CorreoElectronico,
            ApellidoPaterno: req.body.ApellidoPaterno,
            ApellidoMaterno: req.body.ApellidoMaterno,
            Habilitado: req.body.Habilitado,
            Rol: req.body.Rol,
            DNI: req.body.DNI,
            COD_VET: codVet,
            FotoVeterinario: fotoVeterinario,
            FotoDNI: fotoDNI,
            CurriculumVitae: curriculumVitae
        });

        res.status(201).json({ message: "Veterinario creado", veterinario: newVet });
    } catch (error) {
        res.status(500).json({ message: "Error al crear veterinario", error: error.message });
    }
};



exports.updateVeterinario = async (req, res) => {
    try {
      const { id } = req.params;
      const { Nombre, ApellidoPaterno, ApellidoMaterno, Especialidad, Telefono, CorreoElectronico, DNI, Rol } = req.body;
  
      // Obtener el veterinario existente
      const veterinarioExistente = await Veterinario.findOne({ where: { VeterinarioID: id } });
  
      // Mantener las fotos antiguas si no se proporcionan nuevas
      const FotoVeterinario = req.files?.FotoVeterinario?.[0]?.filename || veterinarioExistente.FotoVeterinario;
      const FotoDNI = req.files?.FotoDNI?.[0]?.filename || veterinarioExistente.FotoDNI;
      const CurriculumVitae = req.files?.CurriculumVitae?.[0]?.filename || veterinarioExistente.CurriculumVitae;
  
      // Actualizar el veterinario
      await Veterinario.update({
        Nombre, ApellidoPaterno, ApellidoMaterno, Especialidad, Telefono, CorreoElectronico, DNI, Rol,
        FotoVeterinario, FotoDNI, CurriculumVitae
      }, {
        where: { VeterinarioID: id }
      });
  
      res.status(200).json({ message: "Veterinario actualizado" });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar veterinario", error: error.message });
    }
  };
  




exports.deleteVeterinario = async (req, res) => {
    try {
        const updated = await Veterinario.update(
            { Habilitado: false },
            { where: { VeterinarioID: req.params.id } }
        );

        if (updated) {
            res.status(200).json({ message: "Veterinario deshabilitado correctamente" });
        } else {
            res.status(404).json({ message: "Veterinario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al deshabilitar veterinario", error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const veterinario = await Veterinario.findOne({ where: { Usuario: req.body.Usuario } });

        if (veterinario && await bcrypt.compare(req.body.Contrasena, veterinario.Contrasena)) {
            const token = jwt.sign(
                { VeterinarioID: veterinario.VeterinarioID, Nombre: veterinario.Nombre, Usuario: veterinario.Usuario, Telefono: veterinario.Telefono, rol: veterinario.rol },
                'secret',
                { expiresIn: '4h' }
            );
            res.status(200).json({ message: "Autenticación exitosa", token: token, veterinario: veterinario });
        } else {
            res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }
    } catch (error) {
        console.error("Error en el proceso de login:", error);
        res.status(500).json({ message: "Error en la autenticación", error: error.message });
    }
};

function validarContrasena(contrasena) {
    const minLength = 8;
    const regexMayuscula = /[A-Z]/;
    const regexMinuscula = /[a-z]/;
    const regexNumero = /[0-9]/;
    const regexSimbolo = /[!@#$%^&*(),.?":{}|<>]/;

    if (
        contrasena.length >= minLength &&
        regexMayuscula.test(contrasena) &&
        regexMinuscula.test(contrasena) &&
        regexNumero.test(contrasena) &&
        regexSimbolo.test(contrasena)
    ) {
        return true;
    }
    return false;
}

exports.updateVeterinarioPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const veterinario = await Veterinario.findByPk(req.params.id);

        if (veterinario && await bcrypt.compare(currentPassword, veterinario.Contrasena)) {
            if (!validarContrasena(newPassword)) {
                return res.status(400).json({ message: "La nueva contraseña no cumple con los requisitos de seguridad" });
            }
            const hashedNewPassword = await bcrypt.hash(newPassword, 12);
            await Veterinario.update({ Contrasena: hashedNewPassword }, { where: { VeterinarioID: veterinario.VeterinarioID } });
            res.status(200).json({ message: "Contraseña actualizada correctamente" });
        } else {
            res.status(401).json({ message: 'Contraseña actual incorrecta o veterinario no encontrado' });
        }
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Error al actualizar la contraseña", error: error.message });
    }
};

exports.logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) }); // Establece una cookie 'token' con una fecha de expiración en el pasado
    res.status(200).json({ message: "Logout exitoso" });
};