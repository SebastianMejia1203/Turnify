import { Request, Response } from 'express';
import sequelize from '../db/connection';
import Permiso from '../models/permisos';

class PermisoController {
    public async getPermisos(req: Request, res: Response): Promise<void> {
        try {
            const permisos = await Permiso.findAll();
            res.json({
                data: permisos
            });
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al obtener los permisos.' });
        }
    }

    public async createPermiso(req: Request, res: Response): Promise<void> {
        try {
            const { idRol, idMenu, estadoPermiso } = req.body;
            const newPermiso = await Permiso.create({ idRol, idMenu, estadoPermiso });
            res.json(newPermiso);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al crear el permiso.' });
        }
    }

    public async updatePermiso(req: Request, res: Response): Promise<void> {
        try {
            const { idPermiso } = req.params;
            const { idRol, idMenu, estadoPermiso } = req.body;
            await Permiso.update({ idRol, idMenu, estadoPermiso }, { where: { idPermiso } });
            res.json({ message: 'Permiso actualizado correctamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al actualizar el permiso.' });
        }
    }

    public async deletePermiso(req: Request, res: Response): Promise<void> {
        try {
            const { idPermiso } = req.params;
            await Permiso.destroy({ where: { idPermiso } });
            res.json({ message: 'Permiso eliminado correctamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al eliminar el permiso.' });
        }
    }

    public async getMenusPorUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { idUsuario } = req.params;
            const menus = await sequelize.query('CALL ObtenerMenusPorUsuario(:idUsuario)', { replacements: { idUsuario } });
            res.json(menus);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al obtener los menus del usuario.' });
        }
    }
}

export default new PermisoController();