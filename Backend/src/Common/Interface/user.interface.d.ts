import { Types } from "mongoose";

export interface IUser {
     fullname: string;
     username: string;
     email: string;
     password: string;
     phone: string;
     code: string;
     avatar: string;
     verfiy: boolean;
     isOnline: boolean;
     status: string;
     lastSeen: Date;
     notification: Types.ObjectId[]
     friends: Types.ObjectId[];
     block: Types.ObjectId[];
     refreshToken: string;
}
