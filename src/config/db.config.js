import mysql from 'mysql2/promise';
import environment from './env.config.js';

// Crea la conexión a la base de datos
export const db = mysql.createPool({
	host: environment.host,
	user: environment.user,
	password: environment.password,
	database: environment.database,
});
