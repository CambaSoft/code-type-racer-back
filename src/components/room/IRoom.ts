import { IUserModel } from "../user/UserModel";

export interface IRoom {
    code: string;
    users: [IUserModel]
}