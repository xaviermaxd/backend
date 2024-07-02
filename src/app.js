const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Importar las rutas
const veterinarioRoutes = require('./routes/veterinarioRoutes');
const propietarioRoutes = require('./routes/propietarioRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoute');
const historialClinicoRoutes = require('./routes/historialClinicoRoute');
const horarioRoutes = require('./routes/horarioRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const intentoRoutes = require('./routes/intentoRoutes');
const turnoRoutes = require('./routes/turnoRoutes');

const laboratorioRoutes = require('./routes/laboratorioRoutes');
const paisRoutes = require('./routes/paisRoutes');
const especieRoutes = require('./routes/especieRoutes');
const sustanciaActivaRoutes = require('./routes/sustanciaActivaRoutes');
const usoTerapeuticoRoutes = require('./routes/usoTerapeuticoRoutes');
const viaAdministracionRoutes = require('./routes/viaAdministracionRoutes');
const presentacionRoutes = require('./routes/presentacionRoutes');
const posologiaRoutes = require('./routes/posologiaPorEspecieRoutes');
const presentacionesMedicamentoRoutes = require('./routes/presentacionesMedicamentoRoutes');
const desparasitacionRoutes = require('./routes/desparasitacionRoutes');
const vacunacionRoutes = require('./routes/vacunacionRoutes');
const desparasitacionMedicamentoRoutes = require('./routes/desparasitacionMedicamentoRoutes');
const vacunacionMedicamentoRoutes = require('./routes/vacunacionMedicamentoRoutes');

const estadoGeneralRoutes = require('./routes/estadoGeneralRoutes');
const statusMentalRoutes = require('./routes/statusMentalRoutes');
const comportamientoRoutes = require('./routes/comportamientoRoutes');
const condicionCorporalRoutes = require('./routes/condicionCorporalRoutes');
const pulsoRoutes = require('./routes/pulsoRoutes');
const mucosasRoutes = require('./routes/mucosasRoutes');
const tiempoLlenadoCapilarRoutes = require('./routes/tiempoLlenadoCapilarRoutes');
const estadoHidratacionRoutes = require('./routes/estadoHidratacionRoutes');
const sistemasRoutes = require('./routes/sistemasRoutes');
const patronFCRoutes = require('./routes/patronFCRoutes');
const patronFRRoutes = require('./routes/patronFRRoutes');
const temperamentoRoutes = require('./routes/temperamentoRoutes');
const consultaMedicaRoutes = require('./routes/consultaMedicaRoutes');
const listaProblemasRoutes = require('./routes/listaProblemasRoutes');
const motivoConsultaRoutes = require('./routes/motivoConsultaRoutes');
const examenesConsultasRoutes = require('./routes/examenesConsultasRoutes');
const examenesMedicosRoutes = require('./routes/examenesMedicosRoutes');
const eventosRoutes = require('./routes/eventosRoutes');

const app = express();

// Crear la carpeta 'akfotos' si no existe
const uploadDir = path.join(__dirname, 'akfotos');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// app.use(cors({
//     origin: 'http://localhost:4200',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));

const cors = require('cors');

app.use(cors({
    origin: 'https://frontend-ak.onrender.com', // Cambia esto a la URL de tu aplicación Angular en Render
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para configurar encabezados CORS adicionales
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://frontend-ak.onrender.com');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Servir la carpeta de akfotos estáticamente
app.use('/akfotos', express.static(path.join(__dirname, 'akfotos')));

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/propietarios', propietarioRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/medicamentos', medicamentoRoutes);
app.use('/api/historialesClinicos', historialClinicoRoutes);
app.use('/api/horarios', horarioRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/intentos', intentoRoutes);
app.use('/api/turnos', turnoRoutes);

app.use('/api/laboratorios', laboratorioRoutes);
app.use('/api/paises', paisRoutes);
app.use('/api/especies', especieRoutes);
app.use('/api/sustanciasActivas', sustanciaActivaRoutes);
app.use('/api/usosTerapeuticos', usoTerapeuticoRoutes);
app.use('/api/viasAdministracion', viaAdministracionRoutes);
app.use('/api/presentaciones', presentacionRoutes);
app.use('/api/posologiaPorEspecie', posologiaRoutes);
app.use('/api/presentacionesMedicamento', presentacionesMedicamentoRoutes);
app.use('/api/desparasitaciones', desparasitacionRoutes);
app.use('/api/vacunaciones', vacunacionRoutes);
app.use('/api/desparasitacionMedicamento', desparasitacionMedicamentoRoutes);
app.use('/api/vacunacionMedicamento', vacunacionMedicamentoRoutes);

app.use('/api/estadoGeneral', estadoGeneralRoutes);
app.use('/api/statusMental', statusMentalRoutes);
app.use('/api/comportamiento', comportamientoRoutes);
app.use('/api/condicionCorporal', condicionCorporalRoutes);
app.use('/api/pulso', pulsoRoutes);
app.use('/api/mucosas', mucosasRoutes);
app.use('/api/tiempoLlenadoCapilar', tiempoLlenadoCapilarRoutes);
app.use('/api/estadoHidratacion', estadoHidratacionRoutes);
app.use('/api/sistemas', sistemasRoutes);
app.use('/api/patronFC', patronFCRoutes);
app.use('/api/patronFR', patronFRRoutes);
app.use('/api/temperamento', temperamentoRoutes);
app.use('/api/consultaMedica', consultaMedicaRoutes);
app.use('/api/listaProblemas', listaProblemasRoutes);
app.use('/api/motivoConsulta', motivoConsultaRoutes);
app.use('/api/examenesConsultas', examenesConsultasRoutes);
app.use('/api/examenesMedicos', examenesMedicosRoutes);
app.use('/api/eventos', eventosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
