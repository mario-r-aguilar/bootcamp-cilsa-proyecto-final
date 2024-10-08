import bcrypt from 'bcryptjs';
import connection from '../config/db.config.js';

export const getUsers = async () => {
	try {
		const [users] = await connection.execute('SELECT * FROM user_table');

		if (users.length === 0) {
			console.log({
				status: 'success',
				message: "No users found in the database (model's message)",
			});
			return [];
		}

		return users;
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
		user_id = parseInt(user_id);

		if (!user_id || isNaN(user_id)) {
			console.error({
				status: 'error',
				message: "Invalid user ID (model's error)",
			});
			return null;
		}

		const [user] = await connection.execute(
			'SELECT * FROM user_table WHERE user_id = ?',
			[user_id]
		);

		if (user.length === 0) {
			console.error({
				status: 'error',
				message: "The user does not exist (model's error)",
			});
			return null;
		}
		return user[0];
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
		if (!user_name) {
			console.error({
				status: 'error',
				message: "Invalid username (model's error)",
			});
			return null;
		}

		const [user] = await connection.execute(
			'SELECT * FROM user_table WHERE BINARY user_name = ?',
			[user_name]
		);

		if (user.length === 0) {
			console.error({
				status: 'error',
				message: "The user does not found (model's error)",
			});
			return null;
		}
		return user[0];
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

		// valida si el usuario ya existe
		const user = await getUserByUserName(user_name);
		if (user) {
			console.error({
				status: 'error',
				message:
					"The username already exists, try another one (controller's error)",
			});
			return null;
		}

		// hashea password
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
		const { user_firstname, user_lastname, user_name, user_pass } = userData;

		user_id = parseInt(user_id);

		if (!user_id || isNaN(user_id)) {
			console.error({
				status: 'error',
				message: "Invalid user ID (model's error)",
			});
			return null;
		}

		// Un array es para los valores a actualizar y el otro para las claves, para crear la query
		const updates = [];
		const values = [];

		if (user_firstname) {
			updates.push('user_firstname = ?');
			values.push(user_firstname);
		}

		if (user_lastname) {
			updates.push('user_lastname = ?');
			values.push(user_lastname);
		}

		if (user_name) {
			updates.push('user_name = ?');
			values.push(user_name);
		}

		if (user_pass) {
			// hashea password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(user_pass, salt);
			updates.push('user_pass = ?');
			values.push(hashedPassword);
		}

		// agrego la id del usuario actualizado
		values.push(user_id);

		if (updates.length === 0) {
			console.error({
				status: 'error',
				message: "There are no fields to update (model's error)",
			});
			return null;
		}

		const query = `UPDATE user_table SET ${updates.join(
			', '
		)} WHERE user_id = ?`;

		const [userUpdated] = await connection.execute(query, values);

		return userUpdated;
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
		user_id = parseInt(user_id);

		if (!user_id || isNaN(user_id)) {
			console.error({
				status: 'error',
				message: "Invalid user ID (model's error)",
			});
			return null;
		}

		const [userDeleted] = await connection.execute(
			'DELETE FROM user_table WHERE user_id = ?',
			[user_id]
		);

		return userDeleted;
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to delete the chosen user (model's error)",
			error,
		});
		throw error;
	}
};
