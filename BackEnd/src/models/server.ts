import cors from 'cors';
import express from 'express';
import sequelize from '../db/connection';
import empresa from '../routes/empresa.routes';
import routeGenero from '../routes/genero.routes';
import routeJuego from '../routes/juegos.routes';
import routeMenu from '../routes/menu.routes';
import routePaises from '../routes/pais.routes';
import routePermisos from '../routes/permisos.routes';
import routeRol from '../routes/roles.routes';
import routeRolesUsuario from '../routes/rolesUsuario.routes';
import routeTorneo from '../routes/torneos.routes';
import routeUsuarios from '../routes/user.routes';

class Server {
    private app: express.Application;
    private port: string;

    constructor(){
        this.app = express();
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

    routes(){
        this.app.use('/api/juegos', routeJuego);
        this.app.use('/api/usuarios', routeUsuarios);
        this.app.use('/api/torneos', routeTorneo);
        this.app.use('/api/generos', routeGenero);
        this.app.use('/api/paises', routePaises);
        this.app.use('/api/menus', routeMenu);
        this.app.use('/api/permisos', routePermisos);
        this.app.use('/api/rolesUsuario', routeRolesUsuario);
        this.app.use('/api/roles', routeRol);
        this.app.use('/api/empresa', empresa);
    }

    midlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dnConnect(){
        try {
            await sequelize.authenticate();
            console.log('Conexión a la base de datos establecida correctamente.');
        } catch (error) {
            console.error('No se pudo conectar a la base de datos:', error);
        }
    }
}
export default Server;