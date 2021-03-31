import { Request, Response } from 'express';
import Controller from "../base/Controller";
import { Room } from './RoomModel';
import Pusher, { PresenceChannelData } from "pusher";
import { User } from '../user/UserModel';
import Action from "../base/Action";
import { use } from './RoomRouter';

class RoomController extends Controller {

    pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID || "APP_ID",
        key: process.env.PUSHER_APP_KEY || "APP_KEY",
        secret: process.env.PUSHER_APP_SECRET || "APP_SECRET",
        cluster: process.env.PUSHER_APP_CLUSTER || "APP_CLUSTER",
        useTLS: true
    });

    create = (req: Request, res: Response) => {
        const code = this.makeid();
        const room = new Room({ code });
        room
            .save()
            .then(() => {
                return this.send(res, 200, "Room created", room);
            })
            .catch((err: any) => {
                return this.send(res, 500, err.message, err);
            });
    }

    auth = async (req: Request, res: Response) => {
        const room = await Room.findOne({ code: req.params.code });
        if (!room) {
            return this.send(res, 404, "Room not exists.", { find: false });
        }
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        const user = new User();
        user.username = this.makeid();// used for username
        await user.save();
        const presenceData: PresenceChannelData = {
            user_id: user.id,
            user_info: {
                username: user.username
            }
        };
        room.users.push(user);
        await room.save();
        const auth = this.pusher.authenticate(socketId, channel, presenceData)
        res.send(auth);
    }

    verify = async (req: Request, res: Response) => {
        try {
            const room = await Room.findOne({ code: req.params.code });
            if (!room) {
                return this.send(res, 404, "Room not exist.", { find: false });
            }
            if (room.users.length >= 5) {
                return this.send(res, 406, "Full room.", { find: true });
            }
            return this.send(res, 200, "Room available", { find: true, room });
        } catch (err) {
            return this.send(res, 500, err.message, err);
        }
    }

    changeUsername = async (req: Request, res: Response) => {
        const user = {
            id: req.body.user.id,
            username: req.body.user.username
        };
        const room = await Room.findOne({ code: req.params.code });
        if (!room) {
            return this.send(res, 404, "Room not exist.", { find: false });
        }
        room.users.forEach((player) => {
            if (player.id === user.id) {
                player.username = user.username;
            }
        });
        await room.save();
        const action = new Action(user, "username-changed");
        this.pusher.trigger("presence-" + room.code, "client-player-action", action);
        return this.send(res, 200, "User updated.", user);
    }

    private makeid = (length: number = 5): string => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 1; i <= length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

export = new RoomController();