import { Router } from 'express';
import GeneroUsuarioController from '../controllers/genero';

const router = Router();

router.get('/', GeneroUsuarioController.getGenerosUsuarios);

export default router;