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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../db/connection"));
const empresa_routes_1 = __importDefault(require("../routes/empresa.routes"));
const genero_routes_1 = __importDefault(require("../routes/genero.routes"));
const juegos_routes_1 = __importDefault(require("../routes/juegos.routes"));
const menu_routes_1 = __importDefault(require("../routes/menu.routes"));
const pais_routes_1 = __importDefault(require("../routes/pais.routes"));
const permisos_routes_1 = __importDefault(require("../routes/permisos.routes"));
const roles_routes_1 = __importDefault(require("../routes/roles.routes"));
const rolesUsuario_routes_1 = __importDefault(require("../routes/rolesUsuario.routes"));
const torneos_routes_1 = __importDefault(require("../routes/torneos.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dnConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.use('/api/juegos', juegos_routes_1.default);
        this.app.use('/api/usuarios', user_routes_1.default);
        this.app.use('/api/torneos', torneos_routes_1.default);
        this.app.use('/api/generos', genero_routes_1.default);
        this.app.use('/api/paises', pais_routes_1.default);
        this.app.use('/api/menus', menu_routes_1.default);
        this.app.use('/api/permisos', permisos_routes_1.default);
        this.app.use('/api/rolesUsuario', rolesUsuario_routes_1.default);
        this.app.use('/api/roles', roles_routes_1.default);
        this.app.use('/api/empresa', empresa_routes_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dnConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Conexión a la base de datos establecida correctamente.');
            }
            catch (error) {
                console.error('No se pudo conectar a la base de datos:', error);
            }
        });
    }
}
exports.default = Server;
