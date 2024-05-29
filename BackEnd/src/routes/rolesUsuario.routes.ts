import { Router } from 'express';
import rolesUsuarioController from '../controllers/rolesUsuario';

const router = Router();

router.get('/', rolesUsuarioController.getRolesUsuarios);

router.post('/', rolesUsuarioController.createRolUsuario);

router.put('/:id', rolesUsuarioController.updateRolUsuario);

router.delete('/:id', rolesUsuarioController.deleteRolUsuario);

export default router;