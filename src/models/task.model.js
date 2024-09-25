import { db } from '../config/db.config.js';

export const getTasks = async () => {
	try {
		// dentro de try
		// va la lógica del modelo
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to get the list of tasks (model's error)",
			error,
		});
		throw error;
	}
};

export const getTaskById = async () => {
	try {
		// dentro de try
		// va la lógica del modelo
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to obtain the chosen task (model's error)",
			error,
		});
		throw error;
	}
};

export const createTask = async () => {
	try {
		// dentro de try
		// va la lógica del modelo
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to create a new task (model's error)",
			error,
		});
		throw error;
	}
};

export const updateTask = async () => {
	try {
		// dentro de try
		// va la lógica del modelo
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to update the chosen task (model's error)",
			error,
		});
		throw error;
	}
};

export const deleteTask = async () => {
	try {
		// dentro de try
		// va la lógica del modelo
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to delete the chosen task (model's error)",
			error,
		});
		throw error;
	}
};
