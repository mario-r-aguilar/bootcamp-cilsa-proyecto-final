import { db } from '../config/db.config.js';

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

export const getUserById = async () => {
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

export const createUser = async () => {
	try {
		// dentro de try
		// va la lógica del modelo
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to create a new user (model's error)",
			error,
		});
		throw error;
	}
};

export const updateUser = async () => {
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

export const deleteUser = async () => {
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
