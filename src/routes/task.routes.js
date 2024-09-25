import { Router } from 'express';
import {
	getAllTasks,
	getOneTaskById,
	createOneTask,
	updateOneTask,
	deleteOneTask,
} from '../controllers/task.controller.js';

const taskRouter = Router();

taskRouter.get('/', getAllTasks);
taskRouter.get('/:uid', getOneTaskById);
taskRouter.post('/register', createOneTask);
taskRouter.put('/:uid', updateOneTask);
taskRouter.delete('/:uid', deleteOneTask);

export default taskRouter;
