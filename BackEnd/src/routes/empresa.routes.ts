import { Router } from 'express';
import { actualizarEmpresa, obtenerEmpresa } from '../controllers/empresa';

const router = Router();

router.get('/', obtenerEmpresa);
router.put('/:id', actualizarEmpresa);

export default router;