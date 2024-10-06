import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticate.middleware.js';
import {
	getAllUsers,
	getOneUserById,
	getOneUserByUsername,
	registerOneUser,
	updateOneUser,
	deleteOneUser,
	loginUser,
	getCurrentUser,
	logoutUser,
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', authenticateToken, getAllUsers);
userRouter.get('/via/:uid', authenticateToken, getOneUserById);
userRouter.get('/by/:usernm', authenticateToken, getOneUserByUsername);
userRouter.post('/', registerOneUser);
userRouter.put('/:uid', authenticateToken, updateOneUser);
userRouter.delete('/:uid', authenticateToken, deleteOneUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', authenticateToken, logoutUser);
userRouter.get('/current', authenticateToken, getCurrentUser);

export default userRouter;
