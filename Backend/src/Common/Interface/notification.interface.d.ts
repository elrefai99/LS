import { Types } from "mongoose";

interface ITitle {
     text: string;
     type: string;
}

export interface INotification {
     title: ITitle
     recieverId: Types.ObjectId
     owner: Types.ObjectId
     message: string
     isRead: boolean
     isDeleted: boolean
}
