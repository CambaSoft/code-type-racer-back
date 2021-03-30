import { Request, Response } from 'express';
import Controller = require('../base/Controller');
import { Room } from './RoomModel';
import Pusher, { PresenceChannelData } from "pusher";
import { User } from '../user/UserModel';

class RoomController extends Controller {

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

    auth = (req: Request, res: Response) => {
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
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        const presenceData: PresenceChannelData = {
            user_id: this.makeid(),
            user_info: {
                username: this.makeid()
            }
        };
        // const auth = pusher.authenticate(socketId, channel);
        const auth = pusher.authenticate(socketId, channel, presenceData)
        res.send(auth);
    }

    join = async (req: Request, res: Response) => {
        const room = await Room.findOne({ code: req.params.code });
        if (!room) {
            return this.send(res, 404, "Room not exist.", { find: false });
        }
        const username = req.body.username;
        const newUser = new User({ username });
        if (!newUser.username) {
            return this.send(res, 400, "User without username.", { find: true, newUser });
        }
        try {
            await newUser.save();
        } catch (err) {
            return this.send(res, 500, err.message, err);
        }
        room.users.push(newUser);
        await room.save();
        return this.send(res, 200, "Joined to room.", { find: true, room });
    }

    private makeid = (): string => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 1; i <= 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

export = new RoomController();