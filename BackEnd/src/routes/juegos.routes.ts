import { Router } from 'express';
import { FiltrarJuegos, getJuegos } from '../controllers/juegos';

const router = Router();

router.get('/', getJuegos);
router.get('/filtrar/:nombreJuego?/:ordenamiento?', FiltrarJuegos);

export default router;