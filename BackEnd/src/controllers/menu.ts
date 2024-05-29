import { Request, Response } from 'express';
import Menu from '../models/menu';

class MenuController {
    public async getMenus(req: Request, res: Response): Promise<void> {
        try {
            const menus = await Menu.findAll();
            res.json(menus);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al obtener los menus.' });
        }
    }

    public async createMenu(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, icono, accesoA } = req.body;
            const newMenu = await Menu.create({ nombre, icono, accesoA });
            res.json(newMenu);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al crear el menu.' });
        }
    }

    public async updateMenu(req: Request, res: Response): Promise<void> {
        try {
            const { idMenu } = req.params;
            const { nombre, icono, accesoA } = req.body;
            await Menu.update({ nombre, icono, accesoA }, { where: { idMenu } });
            res.json({ message: 'Menu actualizado correctamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al actualizar el menu.' });
        }
    }

    public async deleteMenu(req: Request, res: Response): Promise<void> {
        try {
            const { idMenu } = req.params;
            await Menu.destroy({ where: { idMenu } });
            res.json({ message: 'Menu eliminado correctamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al eliminar el menu.' });
        }
    }
}

export default new MenuController();