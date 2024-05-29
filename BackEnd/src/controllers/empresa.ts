import { Request, Response } from 'express';
import Empresa from '../models/empresa';

export const obtenerEmpresas = async (req: Request, res: Response) => {
    try {
        const empresas = await Empresa.findAll();
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener las empresas' });
    }
};

export const obtenerEmpresa = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.findByPk(1);
        res.json({data: empresa});
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener la empresa' });
    }
};

export const crearEmpresa = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.create(req.body);
        res.json(empresa);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear la empresa' });
    }
};

export const actualizarEmpresa = async (req: Request, res: Response) => {
    try {
        await Empresa.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Empresa actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al actualizar la empresa' });
    }
};

export const eliminarEmpresa = async (req: Request, res: Response) => {
    try {
        await Empresa.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Empresa eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar la empresa' });
    }
};