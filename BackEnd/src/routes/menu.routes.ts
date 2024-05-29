import { Router } from 'express';
import MenuController from '../controllers/menu';

const router = Router();

router.get('/', MenuController.getMenus);

router.post('/', MenuController.createMenu);

router.put('/:id', MenuController.updateMenu);

router.delete('/:id', MenuController.deleteMenu);

export default router;