
import {Schema} from 'mongoose';
import { INotification } from '../../Common/Interface/notification.interface';
import { user_database } from '../../config/mongoDB.con';

const notificationSchema = new Schema<INotification>({
     title: {
          text: {
               type: String,
               trim: true,
               default: '',
          },
          type: {
               type: String,
               trim: true,
               default: '',
          }
     },
     recieverId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     owner: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     message: {
          type: String,
          trim: true,
          default: '',
     },
     isRead:{
          type: Boolean,
          default: false,
     },
     isDeleted: {
          type: Boolean,
          default: false,
     }
}, {
     timestamps: true,
     autoIndex: true,
})

export const notificationModel = user_database.model<INotification>('Notification', notificationSchema);
