import { Request, Response } from 'express';
import Paises from '../models/pais';

class PaisesController {
    public async getPaises(req: Request, res: Response): Promise<void> {
        try {
            const paises = await Paises.findAll();
            res.json(
                {
                    data: paises
                }
            );
        } catch (error) {
            res.status(500).json({ message: 'Hubo un error al obtener los generos de usuarios.' });
        }
    }
}

export default new PaisesController();