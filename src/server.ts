import express, { Request, Response, NextFunction, Application } from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

export default class Server {
    public app: Application;

    constructor(private port: number) {
        this.app = express();
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // this.app.use(express.bodyParser());
        this.app.use(cors());
    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }

    static init(port: number): Server {
        return new Server(port);
    }
}