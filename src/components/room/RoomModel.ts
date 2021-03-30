import { Document, Schema, Model, model } from 'mongoose';
import { IRoom } from './IRoom';
import { UserSchema } from "../user/UserModel";

export interface IRoomModel extends IRoom, Document {
    getCode(): string;
};

export let RoomSchema: Schema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        users: [UserSchema]
    },
    {
        timestamps: true
    }
);

/*
RoomSchema.pre('save',()=>{
    const room: any = this;
});
*/

RoomSchema.methods.getCode = (): string => {
    const room: any = this;
    return room.code;
};

export const Room: Model<IRoomModel> = model<IRoomModel>("Room", RoomSchema);