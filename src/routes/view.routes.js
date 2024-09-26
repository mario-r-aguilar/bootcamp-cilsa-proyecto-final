import { Router } from 'express';
import path from 'path';
import getDirname from '../utils/dirname.utils.js';
import { authenticateToken } from '../middlewares/authenticate.middleware.js';

const viewRouter = Router();
const __dirname = getDirname(import.meta.url);

viewRouter.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

// ejemplo de protección de ruta
viewRouter.get('/profile', authenticateToken, (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/pages', 'user-profile.html'));
});

export default viewRouter;
