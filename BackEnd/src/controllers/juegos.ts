// juegos.ts
import { Request, Response } from 'express';
import sequelize from '../db/connection';
import Juego from '../models/juegos'; // Importa el modelo de Juego

export const getJuegos = async (req: Request, res: Response) => {
    const listaJuegos = await Juego.findAll(); // Obtiene todos los juegos
    res.json({
        data: listaJuegos
    });
};

export const FiltrarJuegos = async (req: Request, res: Response) => {
    try {
        const { nombreJuego = null, ordenamiento = '' } = req.params;
        const juegos = await sequelize.query('CALL FiltrarJuegos(:ordenamiento, :nombreJuego)',
            { replacements: { nombreJuego, ordenamiento } });
        res.json({data: juegos});
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener los juegos' });
    }
};