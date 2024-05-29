import { Request, Response } from 'express';
import Rol from '../models/rol';

class RolController {
    public async getRoles(req: Request, res: Response): Promise<void> {
        try {
            const roles = await Rol.findAll();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al obtener los roles.' });
        }
    }

    public async createRol(req: Request, res: Response): Promise<void> {
        try {
            const { nombreRol } = req.body;
            const newRol = await Rol.create({ nombreRol });
            res.json(newRol);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al crear el rol.' });
        }
    }

    public async updateRol(req: Request, res: Response): Promise<void> {
        try {
            const { idRol } = req.params;
            const { nombreRol } = req.body;
            await Rol.update({ nombreRol }, { where: { idRol } });
            res.json({ message: 'Rol actualizado correctamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al actualizar el rol.' });
        }
    }

    public async deleteRol(req: Request, res: Response): Promise<void> {
        try {
            const { idRol } = req.params;
            await Rol.destroy({ where: { idRol } });
            res.json({ message: 'Rol eliminado correctamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al eliminar el rol.' });
        }
    }
}

export default new RolController();