import { Schema } from "mongoose";
import { user_database } from "../../config/mongoDB.con";
import { IUser } from "../../Common/Interface/user.interface";

export const userSchema = new Schema<IUser>({
     fullname: {
          type: String,
          required: true,
          trim: true,
          index: true,
     },
     username: {
          type: String,
          required: true,
          trim: true,
          index: true,
          unique: true,
          lowercase: true,
     },
     email: {
          type: String,
          required: true,
          trim: true,
          index: true,
          unique: true,
          lowercase: true,
     },
     password: {
          type: String,
          required: true,
          trim: true,
     },
     phone: {
          type: String,
          required: true,
          trim: true,
          index: true,
          unique: true,
     },
     code: {
          type: String,
          required: true,
          trim: true,
     },
     avatar: {
          type: String,
          trim: true,
          default: "",
     },
     verfiy: {
          type: Boolean,
          default: false,
     },
     isOnline: {
          type: Boolean,
          default: false,
     },
     status: {
          type: String,
          enum: ['active', 'deleted', 'pending', 'blocked', 'ban', 'disable'],
          default: 'active',
     },
     lastSeen: {
          type: Date,
          default: Date.now,
     },
     notification: {
          type: [Schema.Types.ObjectId],
          ref: "Notification",
     },
     friends: {
          type: [Schema.Types.ObjectId],
          ref: "User",
     },
     block: {
          type: [Schema.Types.ObjectId],
          ref: "User",
     },
     refreshToken: {
          type: String,
          default: "",
     },
     tokenVersion: {
          type: Number,
          default: 0
     }
}, {
     timestamps: true,
     autoIndex: true,
})

export const UserModel = user_database.model<IUser>("User", userSchema);
