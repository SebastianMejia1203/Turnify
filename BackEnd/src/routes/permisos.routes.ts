import { Router } from 'express';
import PermisosController from '../controllers/permisos';

const router = Router();

router.get('/', PermisosController.getPermisos);

router.post('/', PermisosController.createPermiso);

router.put('/:id', PermisosController.updatePermiso);

router.delete('/:id', PermisosController.deletePermiso);

router.get('/:idUsuario', PermisosController.getMenusPorUsuario);

export default router;