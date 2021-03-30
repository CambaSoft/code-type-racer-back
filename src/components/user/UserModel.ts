import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from './IUser';

export interface IUserModel extends IUser, Document {
    getUsername(): string;
};

export let UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

UserSchema.methods.getUsername = (): string => {
    const user: any = this;
    return user.username;
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);