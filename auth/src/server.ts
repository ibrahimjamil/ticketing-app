require('custom-env').env(true);
require('dotenv').config();
import express from 'express';
require('express-async-errors');
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { noAuthRoutes } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

class Server {
    private app: express.Application
    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
        this.unexpectedRouteHandler();
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
    public unexpectedRouteHandler() {
        this.app.all("*", async ()=>{
            throw new NotFoundError();
        })
    }
    public cronScheduler() {
        
    }
    public async start(){
        try {
            await  mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
            console.log("connected to mongoDB")
        } catch (error: any) {
            console.error(error.message)
        }
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening on ${this.app.get('port')} port.`);
        });
    }
}

const server = new Server();
server.start();