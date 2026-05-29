import express from 'express';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import initDB from './DAO/init_DB.js';
import authRoutes from './rutas/ruta.js';
import threadRoutes from './rutas/hilos.js';

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = fileURLToPath(new URL('.', import.meta.url));

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API funcionando.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/threads', threadRoutes);
app.use('/uploads', express.static(join(__dirname, 'uploads')));
app.use('/uploads', (req, res) => {
  res.status(404).json({ ok: false, message: 'Archivo no encontrado.' });
});
app.use(express.static(join(__dirname, 'dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo iniciar la base de datos:', error);
    process.exit(1);
  });
