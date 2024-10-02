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

userRouter.get('/', getAllUsers);
userRouter.get('/via/:uid', getOneUserById);
userRouter.get('/by/:usernm', getOneUserByUsername);
userRouter.post('/', registerOneUser);
userRouter.put('/:uid', updateOneUser);
userRouter.delete('/:uid', deleteOneUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/current', authenticateToken, getCurrentUser);

export default userRouter;
