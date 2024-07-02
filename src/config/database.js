require('dotenv').config();
console.log(process.env.DB_HOST, process.env.DB_DIALECT); // Añade esto para depurar
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario
  process.env.DB_PASS, // Contrasena
  {
    host: process.env.DB_HOST, // Host, como 'localhost'
    dialect: process.env.DB_DIALECT, // Dialecto de la base de datos, 'mssql' para SQL Server
    dialectOptions: {
      // Opciones específicas del dialecto
      options: {
        encrypt: true, // Para Azure SQL DB
        trustServerCertificate: true // Necesario si usas una conexión encriptada con un certificado autofirmado
      }
    }
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida exitosamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

module.exports = sequelize;
