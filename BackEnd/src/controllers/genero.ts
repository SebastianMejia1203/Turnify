import { Request, Response } from 'express';
import GeneroUsuario from '../models/genero';

class GeneroUsuarioController {
    public async getGenerosUsuarios(req: Request, res: Response): Promise<void> {
        try {
            const generosUsuarios = await GeneroUsuario.findAll();
            res.json({
                data: generosUsuarios
            });
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al obtener los generos de usuarios.' });
        }
    }
}

export default new GeneroUsuarioController();