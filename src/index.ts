import dotenv from "dotenv";
import Server from "./server";
import { Request, Response, NextFunction } from "express";
import Pusher from "pusher";

dotenv.config();
const port: number = + (process.env.PORT || 3000);
const server: Server = Server.init(port);
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID || "APP_ID",
    key: process.env.PUSHER_APP_KEY || "APP_KEY",
    secret: process.env.PUSHER_APP_SECRET || "APP_SECRET",
    cluster: process.env.PUSHER_APP_CLUSTER || "APP_CLUSTER",
    useTLS: true
});
pusher.trigger("my-channel", "my-event", {
    message: "hello world"
});

server.app.get("/", (req: Request, res: Response, next: NextFunction) => {
    const gameCode: string = makeid(5);
    res.render("index", { gameCode });
});

server.app.get("/game/:gameCode", (req: Request, res: Response, next: NextFunction) => {
    const gameCode: string = req.params.gameCode;
    const appKey = process.env.PUSHER_APP_KEY || "APP_KEY";
    const appCluster = process.env.PUSHER_APP_CLUSTER || "APP_CLUSTER";
    res.render("game", { gameCode, appKey, appCluster });
});

server.app.post("/game", (req: Request, res: Response, next: NextFunction) => {
    const gameCode: string = req.body.gameCode;
    res.redirect('game/' + gameCode);
});

server.app.post("/pusher/auth", (req: Request, res: Response) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
});

const makeid = (length: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

server.start(() => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});