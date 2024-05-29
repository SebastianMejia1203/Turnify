
import { Request, Response } from 'express';
import sequelize from '../db/connection';
import Juego from '../models/juegos';
import RolPersonal from '../models/rolPersonal';
import ListaTorneos from '../models/Torneo/listaTorneos';
import Torneo from '../models/torneos'; // Importa el modelo

export const getTorneo = async (req: Request, res: Response) => {
    const listaTorneos = await Torneo.findAll({
        include: [{
            model: Juego,
            as: 'Juego',
            attributes: ['nombreJuego'] // Solo incluye el nombre del juego en los resultados
        }]
    }); // Obtiene todos los torneos y sus juegos asociados

    res.json({
        data: listaTorneos
    });
};

export const listaTorneos = async (req: Request, res: Response) => {
    const listaTorneos = await ListaTorneos.findAll(); 

    res.json({
        data: listaTorneos
    });
};

export const misTorneos = async (req: Request, res: Response) => {
    const id = req.params.id;
    const listaTorneos = await sequelize.query('CALL misTorneos(:id)',
    { replacements: { id } });

    res.json({
        data: listaTorneos
    });
};

export const personalTorneo = async (req: Request, res: Response) => {
    const usuarioId = req.body.idUsuario;
    const listaTorneos = await RolPersonal.findAll({where: { idUsuario: usuarioId }}); 

    res.json({
        data: listaTorneos
    });
}

export const torneoMayorPopularidad = async (req: Request, res: Response) => {
    try {
        const lista = await sequelize.query('CALL torneoMayorPopularidad()');
        res.json({
            data: lista
        });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener la lista de torneos popularidad' });
    }
};

export const torneoReciente = async (req: Request, res: Response) => {
    try {
        const lista = await sequelize.query('CALL torneoReciente()');
        res.json({
            data: lista
        });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener la lista de torneos recientes' });
    }
};

export const FiltrarTorneos = async (req: Request, res: Response) => {
    try {
        const { nombreJuego = null, ordenamiento = '' } = req.params;
        const torneos = await sequelize.query('CALL FiltrarTorneos(:ordenamiento, :nombreJuego)',
            { replacements: { nombreJuego, ordenamiento } });
        res.json({data: torneos});
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener los torneos' });
    }
};