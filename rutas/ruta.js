import { Router } from 'express';
import { login, registrar } from '../controladores/controlador.js';

const router = Router();

router.post('/register', registrar);
router.post('/login', login);

export default router;
