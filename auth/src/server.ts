require('custom-env').env(true);
require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { noAuthRoutes } from './routes';
import { errorHandler } from './middlewares/errorHandler';

class Server {
    private app: express.Application
    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
        this.cronScheduler();
        this.app.use(errorHandler);
    }

    public configuration() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.set('port', 3000);
        this.app.use(cors());
    }
    public routes(){
        noAuthRoutes.forEach((route) => {
            this.app.use(`/api${route.path}`, route.action);
        })
    }
    public cronScheduler() {
        
    }
    public start(){
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening on ${this.app.get('port')} port.`);
        });
    }
}

const server = new Server();
server.start();