const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const cors = require('cors'); 

const app = express();

// Configuración de conexión a la base de datos MySQL
const connection = mysql.createConnection({
	host:'localhost',
	user: 'node',
	password: 'node',
	database: 'testadsum'
});



connection.connect();

// Middleware para analizar cuerpos de solicitud
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Ruta POST para insertar datos en la base de datos
app.post('/api/v1/contacto', function (req, res) {
	const data = req.body;

	console.log(req.body);

	// Validar que todos los campos requeridos están presentes en la solicitud
	const requiredFields = ['nombreCompleto', 'nombreEmpresa', 'correo', 'telefono', 'categoria', 'mensaje'];
	for (const field of requiredFields) {
		if (!data[field]) {
			return res.status(400).send(`El campo '${field}' es requerido`);
		}
	}

	// Consulta para insertar datos en la tabla Contact
	const query = 'INSERT INTO Contact (nombreCompleto, nombreEmpresa, correo, telefono, categoria, mensaje) VALUES (?, ?, ?, ?, ?, ?)';
	const values = [data.nombreCompleto, data.nombreEmpresa, data.correo, data.telefono, data.categoria, data.mensaje];

	connection.query(query, values, function (error, results, fields) {
		if (error) {
			console.error('Error al insertar datos en la tabla Contact:', error);
			res.status(500).send('Error interno del servidor');
		} else {
			console.log('Datos insertados correctamente en la tabla Contact');
			res.status(200).send({
				message: 'Datos insertados correctamente en la tabla Contact'
			});
		}
	});
});


// Puerto en el que se ejecutará el servidor
const PORT = 3000;

// Iniciar el servidor
app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});

