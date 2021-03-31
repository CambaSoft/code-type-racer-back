import { Request, Response } from 'express';
import Controller from "../base/Controller";
import { User } from './UserModel';
import Activity from "../../config/Activity";

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

    update = async (req: Request, res: Response) => {
        const user = {
            id: req.body.user.id,
            username: req.body.user.username
        };
        const userFound = await User.findById(user.id);
        if (!userFound) {
            return this.send(res, 404, "User not found.", user);
        }
        userFound.username = user.username;
        userFound.save().then(() => {
            return this.send(res, 200, "User updated.", user);
        }).catch((err: any) => {
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