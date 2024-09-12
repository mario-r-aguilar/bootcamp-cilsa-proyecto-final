import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// configuro carpeta de archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));

// configuro ruta principal de la aplicación
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// ejecuto el servidor
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server run on http://localhost:${PORT}`);
});
