import { Router } from 'express';
import {
	getTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
} from '../controllers/task.controller.js';

const taskRouter = Router();

taskRouter.get('/', getTasks);
taskRouter.get('/:uid', getTaskById);
taskRouter.post('/register', createTask);
taskRouter.put('/:uid', updateTask);
taskRouter.delete('/:uid', deleteTask);

export default taskRouter;
