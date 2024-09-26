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
taskRouter.get('/:id', getOneTaskById);
taskRouter.post('/', createOneTask);
taskRouter.put('/:id', updateOneTask);
taskRouter.delete('/:id', deleteOneTask);

export default taskRouter;
