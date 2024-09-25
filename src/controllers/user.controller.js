import path from 'path';
import getDirname from '../utils/dirname.utils.js';
import {
	getUsers,
	getUserById,
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
		// dentro de try
		// va la lógica del controlador
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
		// dentro de try
		// va la lógica del controlador
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
		// dentro de try
		// va la lógica del controlador
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
