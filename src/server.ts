import express, { Request, Response, NextFunction, Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import roomRouter from './components/room/RoomRouter';
import userRouter from './components/user/UserRouter';

class Server {
    public app: Application;

    constructor(private port: number) {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());

        this.app.use('/api', roomRouter);
        this.app.use('/api', userRouter);

    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}

export = Server;