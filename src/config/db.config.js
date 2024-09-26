import mysql from 'mysql2/promise';
import environment from './env.config.js';

// Crea la conexión a la base de datos
const connection = await mysql.createConnection({
	host: environment.host,
	user: environment.user,
	password: environment.password,
	database: environment.database,
});

export default connection;
