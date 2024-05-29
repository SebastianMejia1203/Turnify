import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UniqueConstraintError } from 'sequelize';
import sequelize from '../db/connection';
import AuditoriaBaneo from '../models/Mongo/AuditoriaBaneo';
import Usuario from '../models/usuario';

export const register = async (req: Request, res: Response) => {
    const { nombre, apellido, nickname, email, celular,
        fechaNacimiento, idPais, idGenero,
        estado, password } = req.body;

    const contrasena = await bcrypt.hash(password, 10);
    try {
        // Encriptar la contraseña
        const newUser = await Usuario.create({
            nombre,
            apellido,
            nickname,
            email,
            celular,
            fechaNacimiento,
            idPais,
            idGenero,
            estado,
            contrasena
        });
        res.json({
            msg: `Usuario ${newUser.nombre} creado exitosamente`,
        });
    } catch (error) {
        if(error instanceof UniqueConstraintError){
            if(error.errors[0].message === 'nickname_UNIQUE must be unique'){
                return res.status(400).json({
                    msg: 'El nickname ingresado ya esta en uso'
                });
            }else if(error.errors[0].message === 'email_UNIQUE must be unique'){
                return res.status(400).json({
                    msg: 'El email ingresado ya esta en uso'
                });
            }else if(error.errors[0].message === 'celular_UNIQUE must be unique'){
                return res.status(400).json({
                    msg: 'El celular ingresado ya esta en uso'
                });
            }else{
                return res.status(400).json({
                    error
                });
            }
        }else{
            return res.status(500).json({
                msg: 'Error al crear el usuario',
                error
            });
        };
    }
};

export const login = async (req: Request, res: Response) => {

    const {nickname, contrasena} = req.body;

    //validamos si el usuario existe en la db
    const user = await Usuario.findOne({ where: { nickname: nickname } });
    if(!user){
        return res.status(400).json({
            msg: `El usuario ${nickname} no existe`
        });
    }
    //validamos si la contraseña es correcta
    const validPassword = await bcrypt.compareSync(contrasena, user.contrasena);

    if(!validPassword){
        return res.status(400).json({
            msg: 'La contraseña es incorrecta'
        });
    }
    //generamos el token
    console.log(user.idUsuario)
    const token = jwt.sign({
        idUsuario: user.idUsuario,
        nickname: user.nickname,
    }, process.env.SECRET_KEY || 'pepito', {
        expiresIn: '1h'
    });

    res.json(token);
};

export const miPerfil = async (req: Request, res: Response) => {
    const nickname = req.body.nickname;

    const perfil = await Usuario.findOne({ where: { nickname: nickname } });
    if(perfil){
        perfil.contrasena = '********';
    }
    res.json(
        perfil
    );
};

export const obtenerUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener los usuarios' });
    }
};

export const obtenerUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener el usuario' });
    }
};

export const crearUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear el usuario' });
    }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
    const { nombre, apellido, nickname, email, celular, password } = req.body;
    const idUsuario = req.params.id;
    
    try {
        // Primero obtenemos el usuario existente
        const usuario = await Usuario.findOne({ where: { idUsuario } });
        
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Actualizamos los campos que se enviaron en la solicitud
        if (nombre) usuario.nombre = nombre;
        if (apellido) usuario.apellido = apellido;
        if (nickname) usuario.nickname = nickname;
        if (email) usuario.email = email;
        if (celular) usuario.celular = celular;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            usuario.contrasena = hashedPassword;
        }
        await usuario.save();
        
        res.json({ msg: 'Usuario actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ msg: 'Hubo un error al actualizar el usuario' });
    }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
    try {
        await Usuario.destroy({ where: { idUsuario: req.params.id } });
        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar el usuario' });
    }
};

export const cambiarEstadoUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            usuario.estado = !usuario.estado;
            await usuario.save();
            res.json({ message: 'Estado del usuario cambiado con éxito' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al cambiar el estado del usuario' });
    }
};

export const esUsuarioBaneado = async (req: Request, res: Response) =>{
    const userId: string = req.params.id;

    try {
        const result = await sequelize.query(
            'SELECT esUsuarioBaneado(:userId) AS BaneoActivo',
            {
                replacements: { userId }
            }
        );

        res.json(result);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ message: 'Hubo un error al verificar si el usuario está baneado' });
    }
};

export const banearUsuario = async (req: Request, res: Response) => {
    const { userIdBanned, superUserId, reason, duration } = req.body;
    
    try {
        // Llamar al procedimiento almacenado
        const result = await sequelize.query('CALL BanearUsuario(:userIdBanned, :superUserId, :reason, :duration);',
        { replacements: { userIdBanned, superUserId, reason, duration} }
        );

        // Crear registro de auditoría en MongoDB
        const nuevoRegistroAuditoria = new AuditoriaBaneo({
            idSuperUsuario: superUserId,
            idUsuarioBaneado: userIdBanned,
            razonBaneo: reason,
            fechaHoraBaneo: new Date()  // Asumiendo que quieres guardar la fecha actual del baneo
        });

        await nuevoRegistroAuditoria.save();

        res.json({
            message: 'Usuario baneado exitosamente',
            data: result
        });
    } catch (error) {
        console.error('Error al llamar al procedimiento almacenado o al guardar en MongoDB:', error);
        res.status(500).json({
            message: 'Error al banear al usuario',
            error: error
        });
    }
};