import connection from '../config/db.config.js';

export const getTasks = async () => {
	try {
		const [tasks] = await connection.execute('SELECT * FROM task_table');

		return tasks;
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to get the list of tasks (model's error)",
			error,
		});
		throw error;
	}
};

export const getTaskById = async (task_id) => {
	try {
		const [task] = await connection.execute(
			'SELECT * FROM task_table WHERE task_id = ?',
			[task_id]
		);

		if (task.length === 0) {
			console.error({
				status: 'error',
				message: "The task does not exist (model's error)",
			});
			return null;
		}
		return task;
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to obtain the chosen task (model's error)",
			error,
		});
		throw error;
	}
};

export const createTask = async (
	user_id,
	task_title,
	task_description,
	task_status
) => {
	try {
		if (!user_id || !task_title || !task_description || !task_status) {
			console.error({
				status: 'error',
				message: 'Parameters are missing. All are required.',
			});
			return null;
		}

		// verifica que el usuario exista
		const [user] = await connection.execute(
			'SELECT * FROM user_table WHERE user_id = ?',
			[user_id]
		);

		if (user.length === 0) {
			console.error({
				status: 'error',
				message: 'User does not exist',
			});
			return null;
		}

		const [newTask] = await connection.execute(
			'INSERT INTO task_table (user_id, task_title, task_description, task_status) VALUES (?, ?, ?, ?)',
			[user_id, task_title, task_description, task_status]
		);

		return newTask;
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to create a new task (model's error)",
			error,
		});
		throw error;
	}
};

export const updateTask = async (task_id, taskData) => {
	try {
		const { task_title, task_description, task_status } = taskData;

		// Inicializo un array para los valores a actualizar y otro para las cláusulas SET
		const updates = [];
		const values = [];

		if (task_title) {
			updates.push('task_title = ?');
			values.push(task_title);
		}

		if (task_description) {
			updates.push('task_description = ?');
			values.push(task_description);
		}

		if (task_status) {
			updates.push('task_status = ?');
			values.push(task_status);
		}

		// Agrego la id de la tarea actualizada
		values.push(task_id);

		if (updates.length === 0) {
			console.error({
				status: 'error',
				message: 'There are no fields to update',
			});
			return null;
		}

		const query = `UPDATE task_table SET ${updates.join(
			', '
		)} WHERE task_id = ?`;

		const [taskUpdated] = await connection.execute(query, values);

		return taskUpdated;
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to update the chosen task (model's error)",
			error,
		});
		throw error;
	}
};

export const deleteTask = async (task_id) => {
	try {
		const [taskDeleted] = await connection.execute(
			'DELETE FROM task_table WHERE task_id = ?',
			[task_id]
		);

		return taskDeleted;
	} catch (error) {
		console.error({
			status: 'error',
			message: "It is not possible to delete the chosen task (model's error)",
			error,
		});
		throw error;
	}
};
