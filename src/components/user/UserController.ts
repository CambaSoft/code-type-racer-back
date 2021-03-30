import { Request, Response } from 'express';
import Controller = require('../base/Controller');
import { User, IUserModel } from './UserModel';

class UserController extends Controller {

    create = (req: Request, res: Response) => {
        const user = new User(req.body);
        user
            .save()
            .then(() => {
                return this.send(res, 200, "User created", user);
            })
            .catch((err: any) => {
                return this.send(res, 500, err.message, err);
            });
    }

    /*
    private makeid = (): string => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 1; i <= 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    */
}

export = new UserController();