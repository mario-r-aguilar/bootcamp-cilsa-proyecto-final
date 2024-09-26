import { Router } from 'express';
import {
	getAllUsers,
	getOneUserById,
	registerOneUser,
	updateOneUser,
	deleteOneUser,
	loginUser,
	logoutUser,
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:uid', getOneUserById);
userRouter.post('/', registerOneUser);
userRouter.put('/:uid', updateOneUser);
userRouter.delete('/:uid', deleteOneUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

export default userRouter;
