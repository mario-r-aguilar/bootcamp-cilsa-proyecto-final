import express from 'express';
import path from 'path';
import getDirname from './utils/dirname.utils.js';
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';

const app = express();
const __dirname = getDirname(import.meta.url); // obtiene el directorio actual

// manejo de json en urls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// ruta principal
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
// rutas para api
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// ejecución del servidor
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server run on http://localhost:${PORT}`);
});
