import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

class Server {
    private app: express.Application
    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
        this.cronScheduler();
    }

    public configuration() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.set('port', 3000);
        this.app.use(cors());
    }
    public routes(){
    }
    public cronScheduler() {
        
    }
    public start(){
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening ${this.app.get('port')} port.`);
        });
    }
}

const server = new Server();
server.start();