require('dotenv').config();
const sql = require('rest-mssql-nodejs');

const rest = new (require('rest-mssql-nodejs'))({
    user: 'userXavier',
    password: '123456',
    server: 'LAPTOP-0ORAP2JU\\SQLEXPRESS', // replace this with your IP Server
    database: 'VeterinariaAKBD',
    port: 1433, // this is optional, by default takes the port 1433
    options: { 
        encrypt: true // this is optional, by default is false
    } 
});

// const config = {
//   user: "userXavier",
//   password: "123456",
//   server: "LAPTOP-0ORAP2JU\\SQLEXPRESS", // Puede que necesites ajustar esto para SQL Server
//   database: "VeterinariaAKBD",
//   port: 1433,
//   options: {
//     encrypt: true, // Utilizado para Azure SQL DB. Para SQL Server local puede que necesites ajustar esto.
//     trustServerCertificate: true, // Necesario para SQL Server cuando se usa un certificado autofirmado
//   },
// };

const getConnection = async () => {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error('Error al conectar a SQL Server:', error);
    throw error;
  }
};

module.exports = {
  getConnection,
  sql,
};
