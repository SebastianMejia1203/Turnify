import { Router } from 'express';
import RolController from '../controllers/rol';

const router = Router();

router.get('/', RolController.getRoles);

router.post('/', RolController.createRol);

router.put('/:id', RolController.updateRol);

router.delete('/:id', RolController.deleteRol);

export default router;