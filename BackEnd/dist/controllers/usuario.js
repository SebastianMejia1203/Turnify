"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.banearUsuario = exports.esUsuarioBaneado = exports.cambiarEstadoUsuario = exports.eliminarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUsuario = exports.obtenerUsuarios = exports.miPerfil = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const AuditoriaBaneo_1 = __importDefault(require("../models/Mongo/AuditoriaBaneo"));
const usuario_1 = __importDefault(require("../models/usuario"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, nickname, email, celular, fechaNacimiento, idPais, idGenero, estado, password } = req.body;
    const contrasena = yield bcrypt_1.default.hash(password, 10);
    try {
        // Encriptar la contraseña
        const newUser = yield usuario_1.default.create({
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
    }
    catch (error) {
        if (error instanceof sequelize_1.UniqueConstraintError) {
            if (error.errors[0].message === 'nickname_UNIQUE must be unique') {
                return res.status(400).json({
                    msg: 'El nickname ingresado ya esta en uso'
                });
            }
            else if (error.errors[0].message === 'email_UNIQUE must be unique') {
                return res.status(400).json({
                    msg: 'El email ingresado ya esta en uso'
                });
            }
            else if (error.errors[0].message === 'celular_UNIQUE must be unique') {
                return res.status(400).json({
                    msg: 'El celular ingresado ya esta en uso'
                });
            }
            else {
                return res.status(400).json({
                    error
                });
            }
        }
        else {
            return res.status(500).json({
                msg: 'Error al crear el usuario',
                error
            });
        }
        ;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, contrasena } = req.body;
    //validamos si el usuario existe en la db
    const user = yield usuario_1.default.findOne({ where: { nickname: nickname } });
    if (!user) {
        return res.status(400).json({
            msg: `El usuario ${nickname} no existe`
        });
    }
    //validamos si la contraseña es correcta
    const validPassword = yield bcrypt_1.default.compareSync(contrasena, user.contrasena);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'La contraseña es incorrecta'
        });
    }
    //generamos el token
    console.log(user.idUsuario);
    const token = jsonwebtoken_1.default.sign({
        idUsuario: user.idUsuario,
        nickname: user.nickname,
    }, process.env.SECRET_KEY || 'pepito', {
        expiresIn: '1h'
    });
    res.json(token);
});
exports.login = login;
const miPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nickname = req.body.nickname;
    const perfil = yield usuario_1.default.findOne({ where: { nickname: nickname } });
    if (perfil) {
        perfil.contrasena = '********';
    }
    res.json(perfil);
});
exports.miPerfil = miPerfil;
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_1.default.findAll();
        res.json(usuarios);
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener los usuarios' });
    }
});
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_1.default.findByPk(req.params.id);
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener el usuario' });
    }
});
exports.obtenerUsuario = obtenerUsuario;
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_1.default.create(req.body);
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear el usuario' });
    }
});
exports.crearUsuario = crearUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, nickname, email, celular, password } = req.body;
    const idUsuario = req.params.id;
    try {
        // Primero obtenemos el usuario existente
        const usuario = yield usuario_1.default.findOne({ where: { idUsuario } });
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        // Actualizamos los campos que se enviaron en la solicitud
        if (nombre)
            usuario.nombre = nombre;
        if (apellido)
            usuario.apellido = apellido;
        if (nickname)
            usuario.nickname = nickname;
        if (email)
            usuario.email = email;
        if (celular)
            usuario.celular = celular;
        if (password) {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            usuario.contrasena = hashedPassword;
        }
        yield usuario.save();
        res.json({ msg: 'Usuario actualizado con éxito' });
    }
    catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ msg: 'Hubo un error al actualizar el usuario' });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield usuario_1.default.destroy({ where: { idUsuario: req.params.id } });
        res.json({ message: 'Usuario eliminado con éxito' });
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar el usuario' });
    }
});
exports.eliminarUsuario = eliminarUsuario;
const cambiarEstadoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_1.default.findByPk(req.params.id);
        if (usuario) {
            usuario.estado = !usuario.estado;
            yield usuario.save();
            res.json({ message: 'Estado del usuario cambiado con éxito' });
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al cambiar el estado del usuario' });
    }
});
exports.cambiarEstadoUsuario = cambiarEstadoUsuario;
const esUsuarioBaneado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const result = yield connection_1.default.query('SELECT esUsuarioBaneado(:userId) AS BaneoActivo', {
            replacements: { userId }
        });
        res.json(result);
    }
    catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ message: 'Hubo un error al verificar si el usuario está baneado' });
    }
});
exports.esUsuarioBaneado = esUsuarioBaneado;
const banearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userIdBanned, superUserId, reason, duration } = req.body;
    try {
        // Llamar al procedimiento almacenado
        const result = yield connection_1.default.query('CALL BanearUsuario(:userIdBanned, :superUserId, :reason, :duration);', { replacements: { userIdBanned, superUserId, reason, duration } });
        // Crear registro de auditoría en MongoDB
        const nuevoRegistroAuditoria = new AuditoriaBaneo_1.default({
            idSuperUsuario: superUserId,
            idUsuarioBaneado: userIdBanned,
            razonBaneo: reason,
            fechaHoraBaneo: new Date() // Asumiendo que quieres guardar la fecha actual del baneo
        });
        yield nuevoRegistroAuditoria.save();
        res.json({
            message: 'Usuario baneado exitosamente',
            data: result
        });
    }
    catch (error) {
        console.error('Error al llamar al procedimiento almacenado o al guardar en MongoDB:', error);
        res.status(500).json({
            message: 'Error al banear al usuario',
            error: error
        });
    }
});
exports.banearUsuario = banearUsuario;
