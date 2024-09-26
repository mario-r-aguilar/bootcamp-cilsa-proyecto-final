import bcrypt from 'bcryptjs';
import connection from '../config/db.config.js';

export const getUsers = async () => {
	try {
		// dentro de try
		// va la lógica del modelo
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to get the list of users (model's error)",
			error,
		});
		throw error;
	}
};

export const getUserById = async (user_id) => {
	try {
		// dentro de try
		// va la lógica del modelo
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to obtain the chosen user (model's error)",
			error,
		});
		throw error;
	}
};

export const getUserByUserName = async (user_name) => {
	try {
		// dentro de try
		// va la lógica del modelo
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to obtain the chosen user (model's error)",
			error,
		});
		throw error;
	}
};

export const createUser = async (
	user_firstname,
	user_lastname,
	user_name,
	user_pass
) => {
	try {
		if (!user_firstname || !user_lastname || !user_name || !user_pass) {
			console.error({
				status: 'error',
				message: "Parameters are missing. All are required (model's error)",
			});
			return null;
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(user_pass, salt);

		const [newUser] = await connection.execute(
			'INSERT INTO user_table (user_firstname, user_lastname, user_name, user_pass) VALUES (?, ?, ?, ?)',
			[user_firstname, user_lastname, user_name, hashedPassword]
		);

		return newUser;
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to create a new user (model's error)",
			error,
		});
		throw error;
	}
};

export const updateUser = async (user_id, userData) => {
	try {
		// dentro de try
		// va la lógica del modelo
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to update the chosen user (model's error)",
			error,
		});
		throw error;
	}
};

export const deleteUser = async (user_id) => {
	try {
		// dentro de try
		// va la lógica del modelo
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to delete the chosen user (model's error)",
			error,
		});
		throw error;
	}
};
