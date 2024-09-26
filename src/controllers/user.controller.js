import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import environment from '../config/env.config.js';
import {
	getUsers,
	getUserById,
	getUserByUserName,
	createUser,
	updateUser,
	deleteUser,
} from '../models/user.model.js';

// CRUD
export const getAllUsers = async (req, res) => {
	try {
		// dentro de try
		// va la lógica del controlador
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to get the list of users (controller's error)",
			error,
		});
	}
};

export const getOneUserById = async (req, res) => {
	try {
		// dentro de try
		// va la lógica del controlador
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to obtain the chosen user (controller's error)",
			error,
		});
	}
};

export const registerOneUser = async (req, res) => {
	try {
		const { user_firstname, user_lastname, user_name, user_pass } = req.body;

		const newUser = await createUser(
			user_firstname,
			user_lastname,
			user_name,
			user_pass
		);

		if (!newUser) {
			res.status(400).send({
				status: 'error',
				message:
					"It is not possible to register a new user. Parameters are missing or the username already exists (controller's error)",
			});
		}

		res.status(200).send({
			status: 'success',
			message: "User created successfully (controller's message)",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to register a new user (controller's error)",
			error,
		});
	}
};

export const updateOneUser = async (req, res) => {
	try {
		// dentro de try
		// va la lógica del controlador
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to update the information of the chosen user (controller's error)",
			error,
		});
	}
};

export const deleteOneUser = async (req, res) => {
	try {
		// dentro de try
		// va la lógica del controlador
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to delete the chosen user (controller's error)",
			error,
		});
	}
};

// logueo
export const loginUser = async (req, res) => {
	try {
		const { user_name, user_pass } = req.body;

		// compara username
		const user = await getUserByUserName(user_name);
		if (!user) {
			return res.status(404).send({
				status: 'error',
				message: "The user does not exist (controller's error)",
			});
		}

		// compara password
		const passwordIsMatch = await bcrypt.compare(user_pass, user.user_pass);
		if (!passwordIsMatch) {
			return res.status(401).send({
				status: 'error',
				message: "Invalid credentials (controller's error)",
			});
		}

		// crea token de sesión
		const token = jwt.sign(
			{
				username: user.user_name,
				firstname: user.user_firstname,
				lastname: user.user_lastname,
			},
			environment.jwt_secret,
			{ expiresIn: '1h' }
		);

		// almacena token en cookie
		res.cookie('token', token, {
			httpOnly: true,
			secure: environment.secure_cookie, // Solo se envía a través de https si es true
			sameSite: 'Strict', // Protege contra CSRF
			maxAge: 3600000, // Expira en 1 hora
		});

		res.status(200).send({
			status: 'success',
			message: "Login successful (controller's message)",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to log in the user (controller's error)",
			error,
		});
	}
};

export const logoutUser = async (req, res) => {
	try {
		res.clearCookie('token', {
			httpOnly: true,
			secure: environment.secure_cookie,
			sameSite: 'Strict',
		});

		res.status(200).send({
			status: 'success',
			message: "Successfully logged out (controller's message)",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to log out the user (controller's error)",
			error,
		});
	}
};
