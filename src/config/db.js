

const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const config = require('./config');

// Pool para las operaciones con procedimientos almacenados
const pool = mysql.createPool(config.db);


const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql',
    logging: false, 
    pool: {
        max: config.db.connectionLimit || 5, 
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectModule: require('mysql2')
});

// Función para probar la conexión con el pool
const testConnection = async () => {
    try {
        await pool.getConnection(async conn => {
            console.log('Conexión directa a la base de datos establecida con éxito');
            conn.release();
        });
        await sequelize.authenticate();
        console.log('Conexión de Sequelize a la base de datos establecida con éxito');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
};

// Ejecución de consultas para el modelo Veterinario usando procedimientos almacenados
const execute = async (query, params) => {
    return pool.execute(query, params);
};

module.exports = {
    execute,
    testConnection,
    sequelize, // Exporta sequelize para usar en modelos basados en Sequelize
    QueryTypes: Sequelize.QueryTypes
};
