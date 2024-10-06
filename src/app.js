import express from 'express';
import path from 'path';
import getDirname from './utils/dirname.utils.js';
import cookieParser from 'cookie-parser';
import viewRouter from './routes/view.routes.js';
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';

const app = express();
const __dirname = getDirname(import.meta.url); // obtiene el directorio actual

// manejo de json en urls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// manejo de cookies
app.use(cookieParser());

// carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// rutas para api
app.use('/', viewRouter);
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// ejecución del servidor
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server run on http://localhost:${PORT}`);
});
