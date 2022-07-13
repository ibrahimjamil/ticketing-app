require('custom-env').env(true);
require('dotenv').config();
import express from 'express';
require('express-async-errors');
import morgan from 'morgan';
import cors from 'cors';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import { AppRoutes, noAuthRoutes } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';
import appConfig from './config/appConfig';

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
        //coming from secret key we added in pod by kubectl command and include in kubernetes file 
        if (!appConfig.SESSION_SECRET_KEY) {
            throw new Error('Session secret key must be defined');
        }
        this.app.set('trust proxy', true)
        this.app.use(express.json());
        this.app.use(cookieSession({
            signed: true,
            secure: true,
            keys: [appConfig.SESSION_SECRET_KEY],
            secret: appConfig.SESSION_SECRET_KEY,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }))
        this.app.use(morgan('dev'));
        this.app.set('port', 3000);
        this.app.use(cors());
    }
    public routes(){
        AppRoutes.forEach((route) => {
            this.app.use(`/api${route.path}`, route.middleware, route.action);
        });
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