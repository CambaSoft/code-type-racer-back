import express, { Request, Response, NextFunction, Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import roomRouter from './components/room/RoomRouter';

class Server {
    public app: Application;

    constructor(private port: number) {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());

        this.app.use('/api', roomRouter);

        /*
        this.app.get("/game/:gameCode", (req: Request, res: Response, next: NextFunction) => {
            const gameCode: string = req.params.gameCode;
            const appKey = process.env.PUSHER_APP_KEY || "APP_KEY";
            const appCluster = process.env.PUSHER_APP_CLUSTER || "APP_CLUSTER";
            res.render("game", { gameCode, appKey, appCluster });
        });

        this.app.post("/game", (req: Request, res: Response, next: NextFunction) => {
            const gameCode: string = req.body.gameCode;
            res.redirect('game/' + gameCode);
        });
        */

    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}

export = Server;