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
exports.miPerfil = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../models/user"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, nickname, email, celular, fechaNacimiento, idPais, idGenero, fotoPerfil, estado, password } = req.body;
    const contrasena = yield bcrypt_1.default.hash(password, 10);
    try {
        // Encriptar la contraseña
        const newUser = yield user_1.default.create({
            nombre,
            apellido,
            nickname,
            email,
            celular,
            fechaNacimiento,
            idPais,
            idGenero,
            fotoPerfil,
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
    const user = yield user_1.default.findOne({ where: { nickname: nickname } });
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
    const token = jsonwebtoken_1.default.sign({
        nickname: user.nickname,
    }, process.env.SECRET_KEY || 'pepito', {
        expiresIn: '1h'
    });
    res.json(token);
});
exports.login = login;
const miPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nickname = req.body.nickname;
    const perfil = yield user_1.default.findOne({ where: { nickname: nickname } });
    if (perfil) {
        perfil.contrasena = '*****';
    }
    res.json({
        data: perfil
    });
});
exports.miPerfil = miPerfil;
