import { Router } from 'express';
import path from 'path';
import getDirname from '../utils/dirname.utils.js';
import { authenticateToken } from '../middlewares/authenticate.middleware.js';
import { validUserRoles } from '../middlewares/role.middleware.js';

const viewRouter = Router();
const __dirname = getDirname(import.meta.url);

viewRouter.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

viewRouter.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/pages', 'login.html'));
});

viewRouter.get('/register', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/pages', 'register.html'));
});

viewRouter.get(
	'/profile',
	authenticateToken,
	validUserRoles(['USER']),
	(req, res) => {
		res.sendFile(
			path.join(__dirname, '../../public/pages', 'user-profile.html')
		);
	}
);

viewRouter.get(
	'/editprofile',
	authenticateToken,
	validUserRoles(['USER']),
	(req, res) => {
		res.sendFile(
			path.join(__dirname, '../../public/pages', 'edit-profile.html')
		);
	}
);

viewRouter.get(
	'/adminprofile',
	authenticateToken,
	validUserRoles(['ADMIN']),
	(req, res) => {
		res.sendFile(
			path.join(__dirname, '../../public/pages', 'admin-profile.html')
		);
	}
);

export default viewRouter;
