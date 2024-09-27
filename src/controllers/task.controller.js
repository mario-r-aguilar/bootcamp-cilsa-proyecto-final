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
		const listOfTask = await getTasks();

		if (listOfTask.length === 0) {
			return res.status(200).send({
				status: 'success',
				message: "No tasks found (controller's message)",
				tasks: [],
			});
		}

		res.status(200).send(listOfTask);
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
		const { id } = req.params;

		if (!id) {
			return res.status(400).send({
				status: 'error',
				message: "ID is required (controller's error)",
			});
		}

		const task = await getTaskById(id);

		if (!task)
			return res.status(404).send({
				status: 'error',
				message: "The task does not exist (controller's error)",
			});

		res.status(200).send(task);
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

export const getAllTaskByUserId = async (req, res) => {
	try {
		const { uid } = req.params;

		if (!uid) {
			return res.status(400).send({
				status: 'error',
				message: "User ID is required (controller's error)",
			});
		}

		const listOfTask = await getTasks();

		if (listOfTask.length === 0) {
			return res.status(200).send({
				status: 'success',
				message: "No tasks found (controller's message)",
				tasks: [],
			});
		}

		const listOfTasksByUser = listOfTask.filter((task) => {
			return task.user_id === Number(uid);
		});

		if (listOfTasksByUser.length === 0)
			return res.status(404).send({
				status: 'error',
				message: "The user haven't tasks assigned (controller's error)",
			});

		res.status(200).send(listOfTasksByUser);
	} catch (error) {
		console.error(error);
		res.status(500).send({
			status: 'error',
			message:
				"Internal Server Error: It is not possible to obtain the user's tasks (controller's error)",
			error,
		});
	}
};

export const createOneTask = async (req, res) => {
	try {
		const { user_id, task_title, task_description, task_status } = req.body;

		const newTask = await createTask(
			user_id,
			task_title,
			task_description,
			task_status
		);

		if (!newTask) {
			return res.status(400).send({
				status: 'error',
				message:
					"The task could not be created in the database (controller's error)",
			});
		}

		res.status(200).send({
			status: 'success',
			message: "Task created successfully (controller's message)",
		});
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
		const { id } = req.params;
		const taskData = req.body;

		if (!id) {
			return res.status(400).send({
				status: 'error',
				message: "ID is required (controller's error)",
			});
		}

		const taskUpdated = await updateTask(id, taskData);

		if (!taskUpdated) {
			return res.status(400).send({
				status: 'error',
				message: "Invalid task ID (controller's error)",
			});
		}

		if (taskUpdated.affectedRows === 0) {
			return res.status(404).send({
				status: 'error',
				message:
					"The task was not found or nothing was updated (controller's error)",
			});
		}

		res.status(200).send({
			status: 'success',
			message: "Updated task (controller's message)",
		});
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
		const { id } = req.params;

		if (!id) {
			return res.status(400).send({
				status: 'error',
				message: "ID is required (controller's error)",
			});
		}

		const taskDeleted = await deleteTask(id);

		if (!taskDeleted) {
			return res.status(400).send({
				status: 'error',
				message: "Invalid task ID (controller's error)",
			});
		}

		if (taskDeleted.affectedRows === 0) {
			return res.status(400).send({
				status: 'error',
				message: "No tasks were deleted (controller's error)",
			});
		}

		res.status(200).send({
			status: 'success',
			message: "Deleted task (controller's message)",
		});
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
