import { Router } from 'express';
import multer from 'multer';
import { mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { obtenerHilo, obtenerHilos, publicarHilo } from '../controladores/controlador.js';

const router = Router();
const rootDir = fileURLToPath(new URL('..', import.meta.url));
const uploadDir = join(rootDir, 'uploads');

mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, callback) => {
    const safeExt = extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      callback(null, true);
      return;
    }

    callback(new Error('Solo se permiten imagenes o videos.'));
  },
});

router.get('/', obtenerHilos);
router.get('/:id', obtenerHilo);
router.post('/', upload.fields([{ name: 'media', maxCount: 1 }, { name: 'image', maxCount: 1 }]), publicarHilo);

export default router;
