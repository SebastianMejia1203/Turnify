import { Request, Response } from 'express';
import RolesUsuario from '../models/rolesUsuario';

class RolesUsuarioController {
    public async getRolesUsuarios(req: Request, res: Response): Promise<void> {
        try {
            const rolesUsuarios = await RolesUsuario.findAll();
            res.json(rolesUsuarios);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al obtener los roles de usuarios.' });
        }
    }

    public async createRolUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { idRol, idUsuario, estadoRol } = req.body;
            const newRolUsuario = await RolesUsuario.create({ idRol, idUsuario, estadoRol });
            res.json(newRolUsuario);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al crear el rol de usuario.' });
        }
    }

    public async updateRolUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { idRol, idUsuario } = req.params;
            const { estadoRol } = req.body;
            await RolesUsuario.update({ estadoRol }, { where: { idRol, idUsuario } });
            res.json({ message: 'Rol de usuario actualizado correctamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al actualizar el rol de usuario.' });
        }
    }

    public async deleteRolUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { idRol, idUsuario } = req.params;
            await RolesUsuario.destroy({ where: { idRol, idUsuario } });
            res.json({ message: 'Rol de usuario eliminado correctamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al eliminar el rol de usuario.' });
        }
    }
}

export default new RolesUsuarioController();