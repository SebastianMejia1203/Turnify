import { Router } from "express";
import {
    actualizarUsuario,
    banearUsuario,
    cambiarEstadoUsuario,
    eliminarUsuario,
    esUsuarioBaneado,
    login, miPerfil,
    obtenerUsuario,
    obtenerUsuarios,
    register,
} from "../controllers/usuario";
import validaToken from "./validateToken";

const router = Router();

router.post('/', register);

router.post('/login', login);

// router.get('/miPerfil', miPerfil);
router.get('/miPerfil',validaToken, miPerfil);

router.get('/', obtenerUsuarios);

router.get('/:id', obtenerUsuario);

router.put('/:id', actualizarUsuario);

router.put('/inabilitar/:id', cambiarEstadoUsuario);

router.delete('/:id', eliminarUsuario);

router.get('/baneado/:id', esUsuarioBaneado);

router.post('/banear/', banearUsuario);

export default router;