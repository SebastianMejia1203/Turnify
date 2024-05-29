import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const validaToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];

    if(headerToken != undefined && headerToken.startsWith('Bearer')){
        try {
            const token = headerToken.slice(7);
            const decoded = jwt.verify(token, process.env.SECRET_KEY || 'pepito');
            req.body = decoded;
            next();
        } catch (error) {
            res.status(401).json({
                msg: 'Token invalid'
            });
        }
    }else{
        return res.status(401).json({
            msg: 'No autorizado'
        });
    }
};
export default validaToken;