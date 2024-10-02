import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticate.middleware.js';
import {
	getAllTasks,
	getOneTaskById,
	getAllTaskByUserId,
	createOneTask,
	updateOneTask,
	deleteOneTask,
} from '../controllers/task.controller.js';

const taskRouter = Router();

taskRouter.get('/', authenticateToken, getAllTasks);
taskRouter.get('/:id', authenticateToken, getOneTaskById);
taskRouter.get('/by/:uid', authenticateToken, getAllTaskByUserId);
taskRouter.post('/', authenticateToken, createOneTask);
taskRouter.put('/:id', authenticateToken, updateOneTask);
taskRouter.delete('/:id', authenticateToken, deleteOneTask);

export default taskRouter;
