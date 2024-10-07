import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticate.middleware.js';
import { validUserRoles } from '../middlewares/role.middleware.js';
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

userRouter.get('/', authenticateToken, validUserRoles(['ADMIN']), getAllUsers);
userRouter.get('/via/:uid', authenticateToken, getOneUserById);
userRouter.get('/by/:usernm', authenticateToken, getOneUserByUsername);
userRouter.post('/', registerOneUser);
userRouter.put(
	'/:uid',
	authenticateToken,
	validUserRoles(['USER']),
	updateOneUser
);
userRouter.delete(
	'/:uid',
	authenticateToken,
	validUserRoles(['ADMIN']),
	deleteOneUser
);
userRouter.post('/login', loginUser);
userRouter.post('/logout', authenticateToken, logoutUser);
userRouter.get('/current', authenticateToken, getCurrentUser);

export default userRouter;
