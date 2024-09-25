import path from 'path';
import getDirname from '../utils/dirname.utils.js';
import {
	getTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
} from '../models/task.model.js';

// CRUD
export const getAllTasks = async (req, res) => {
	try {
		// dentro de try
		// va la lógica del controlador
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to get the list of tasks (controller's error)",
			error,
		});
	}
};

export const getOneTaskById = async (req, res) => {
	try {
		// dentro de try
		// va la lógica del controlador
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to obtain the chosen task (controller's error)",
			error,
		});
	}
};

export const createOneTask = async (req, res) => {
	try {
		// dentro de try
		// va la lógica del controlador
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to create a new task (controller's error)",
			error,
		});
	}
};

export const updateOneTask = async (req, res) => {
	try {
		// dentro de try
		// va la lógica del controlador
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to update the chosen task (controller's error)",
			error,
		});
	}
};

export const deleteOneTask = async (req, res) => {
	try {
		// dentro de try
		// va la lógica del controlador
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to delete the chosen task (controller's error)",
			error,
		});
	}
};
