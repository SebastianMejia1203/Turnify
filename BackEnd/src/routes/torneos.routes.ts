import { Router } from 'express';
import {
    FiltrarTorneos, getTorneo,
    listaTorneos,
    misTorneos,
    personalTorneo,
    torneoMayorPopularidad, torneoReciente
} from '../controllers/torneos';

const router = Router();

router.get('/', getTorneo);

router.get('/popularidad', torneoMayorPopularidad);

router.get('/recientes', torneoReciente);

router.get('/filtrar/:nombreJuego?/:ordenamiento?', FiltrarTorneos);

router.get('/listaTorneos', listaTorneos);

router.get('/personal', personalTorneo);

router.get('/misTorneos/:id', misTorneos);

export default router;