import { Router } from 'express';
import PaisesController from '../controllers/pais';

const router = Router();

router.get('/', PaisesController.getPaises);

export default router;