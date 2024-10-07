import connection from '../config/db.config.js';

export const getTasks = async () => {
	try {
		const [tasks] = await connection.execute('SELECT * FROM task_table');

		if (tasks.length === 0) {
			console.log({
				status: 'success',
				message: "No tasks found in the database (model's message)",
			});
			return [];
		}

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
		if (!task_id || isNaN(task_id)) {
			console.error({
				status: 'error',
				message: "Invalid task ID (model's error)",
			});
			return null;
		}

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
		return task[0];
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
				message:
					"Parameters are missing. All parameters are required (model's error)",
			});
			return null;
		}

		// valida el usuario para evitar error por id inexistente
		const [user] = await connection.execute(
			'SELECT * FROM user_table WHERE user_id = ?',
			[user_id]
		);

		if (user.length === 0) {
			console.error({
				status: 'error',
				message: "User does not exist (model's error)",
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

		if (!task_id || isNaN(task_id)) {
			console.error({
				status: 'error',
				message: "Invalid task ID (model's error)",
			});
			return null;
		}

		// un array es para los valores a actualizar y el otro para las claves, para crear la query
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

		// agrego la id de la tarea actualizada
		values.push(task_id);

		if (updates.length === 0) {
			console.error({
				status: 'error',
				message: "There are no fields to update (model's error)",
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
		if (!task_id || isNaN(task_id)) {
			console.error({
				status: 'error',
				message: "Invalid task ID (model's error)",
			});
			return null;
		}

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
