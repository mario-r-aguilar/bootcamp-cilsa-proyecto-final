import { Router } from 'express';
import {
	getUsers,
	getUserById,
	registerUser,
	updateUser,
	deleteUser,
	loginUser,
	logoutUser,
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:uid', getUserById);
userRouter.post('/register', registerUser);
userRouter.put('/:uid', updateUser);
userRouter.delete('/:uid', deleteUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

export default userRouter;
